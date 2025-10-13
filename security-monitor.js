#!/usr/bin/env node

/**
 * Relo Network Security Monitor
 * Automated security checks and vulnerability scanning
 * Run: node security-monitor.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SecurityMonitor {
  constructor() {
    this.vulnerabilities = [];
    this.warnings = [];
    this.reportPath = 'AUTOMATED_SECURITY_REPORT.md';
    console.log('🔄 Initializing fresh security scan...');
  }

  // Check for environment files in git
  checkEnvironmentSecurity() {
    console.log('🔍 Checking environment file security...');
    
    try {
      // Check if sensitive .env files are tracked by git (only actual .env files)
      const result = execSync('git ls-files | grep -E "^\.env\." | grep -v "\.env\.example"', { encoding: 'utf8' });
      const gitTracked = result.trim();
      
      if (gitTracked && gitTracked.length > 0 && !gitTracked.includes('No such file')) {
        this.vulnerabilities.push({
          level: 'CRITICAL',
          issue: 'Environment files tracked in git',
          files: gitTracked.split('\n').filter(f => f.length > 0),
          fix: 'Run: git rm --cached .env.local .env.production && git commit'
        });
        console.log('❌ Found environment files in git:', gitTracked);
      } else {
        console.log('✅ No sensitive environment files tracked in git');
      }
    } catch (e) {
      // Command failed means no files found (good)
      console.log('✅ No environment files found in git tracking (command failed as expected)');
    }

    // Check for exposed API keys in code (excluding docs and security reports)
    try {
      const codeFiles = execSync('find . -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | grep -v node_modules | grep -v "SECURITY_REPORT" | grep -v "STRIPE_SETUP_GUIDE"', { encoding: 'utf8' }).trim().split('\n');
      
      for (const file of codeFiles) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for hardcoded API keys
        const patterns = [
          /sk_live_[a-zA-Z0-9]{99}/g,  // Stripe live keys
          /sk_test_[a-zA-Z0-9]{99}/g,  // Stripe test keys
          /re_[a-zA-Z0-9]{32}/g,       // Resend keys
          /key_[a-zA-Z0-9]{24}/g,      // Retell keys
        ];

        patterns.forEach(pattern => {
          const matches = content.match(pattern);
          if (matches) {
            this.vulnerabilities.push({
              level: 'CRITICAL',
              issue: 'Hardcoded API key found',
              file: file,
              keys: matches,
              fix: 'Move keys to environment variables'
            });
          }
        });
      }
    } catch (e) {
      this.warnings.push('Could not scan code files for hardcoded keys');
    }
  }

  // Check API endpoint security
  checkEndpointSecurity() {
    console.log('🔍 Checking API endpoint security...');
    
    const adminEndpoints = [
      'app/api/admin/generate-dashboard-link/route.ts',
      'app/api/admin/newsletter/subscriptions/route.ts',
      'app/api/send-email/route.ts'
    ];

    adminEndpoints.forEach(endpoint => {
      if (fs.existsSync(endpoint)) {
        const content = fs.readFileSync(endpoint, 'utf8');
        
        // Check for authentication
        if (!content.includes('checkBasicAuth')) {
          this.vulnerabilities.push({
            level: 'CRITICAL',
            issue: 'Admin endpoint without authentication',
            file: endpoint,
            fix: 'Add checkBasicAuth() function call'
          });
        }
        
        // Check for rate limiting on email endpoint
        if (endpoint.includes('send-email') && !content.includes('checkRateLimit')) {
          this.warnings.push({
            level: 'MEDIUM',
            issue: 'Email endpoint without rate limiting',
            file: endpoint,
            fix: 'Add rate limiting to prevent abuse'
          });
        }
      }
    });

    // Check for debug endpoints
    const debugPath = 'app/api/debug';
    if (fs.existsSync(debugPath)) {
      this.vulnerabilities.push({
        level: 'HIGH',
        issue: 'Debug endpoints still exist',
        path: debugPath,
        fix: 'Remove debug endpoints from production'
      });
    }
  }

  // Check dependencies for vulnerabilities
  checkDependencies() {
    console.log('🔍 Checking dependencies for vulnerabilities...');
    
    try {
      const auditResult = execSync('npm audit --audit-level moderate', { encoding: 'utf8' });
      if (auditResult.includes('vulnerabilities')) {
        this.warnings.push({
          level: 'MEDIUM',
          issue: 'NPM package vulnerabilities found',
          details: 'Run npm audit for details',
          fix: 'Run: npm audit fix'
        });
      }
    } catch (e) {
      if (e.stdout && e.stdout.includes('vulnerabilities')) {
        this.warnings.push({
          level: 'MEDIUM',
          issue: 'NPM package vulnerabilities found',
          details: e.stdout.split('\n').slice(-10).join('\n'),
          fix: 'Run: npm audit fix'
        });
      }
    }
  }

  // Check HTTPS and security headers
  checkSecurityHeaders() {
    console.log('🔍 Checking security configuration...');
    
    // Check middleware configuration
    if (fs.existsSync('middleware.ts')) {
      const content = fs.readFileSync('middleware.ts', 'utf8');
      
      if (!content.includes('HTTPS')) {
        this.warnings.push({
          level: 'MEDIUM',
          issue: 'HTTPS enforcement not detected',
          fix: 'Ensure HTTPS is enforced in production'
        });
      }
    }

    // Check for security headers in next.config.js
    if (fs.existsSync('next.config.js')) {
      const content = fs.readFileSync('next.config.js', 'utf8');
      
      if (!content.includes('Content-Security-Policy')) {
        this.warnings.push({
          level: 'LOW',
          issue: 'No Content Security Policy detected',
          fix: 'Add CSP headers for additional security'
        });
      }
    }
  }

  // Generate security report
  generateReport() {
    const timestamp = new Date().toISOString();
    const totalIssues = this.vulnerabilities.length + this.warnings.length;
    
    let report = `# 🛡️ AUTOMATED SECURITY REPORT
Generated: ${timestamp}

## 📊 SECURITY SUMMARY
- **Critical Vulnerabilities:** ${this.vulnerabilities.filter(v => v.level === 'CRITICAL').length}
- **High Risk Issues:** ${this.vulnerabilities.filter(v => v.level === 'HIGH').length}
- **Medium Risk Issues:** ${this.warnings.filter(w => w.level === 'MEDIUM').length}
- **Low Risk Issues:** ${this.warnings.filter(w => w.level === 'LOW').length}
- **Total Issues:** ${totalIssues}

## 🚨 CRITICAL VULNERABILITIES
`;

    if (this.vulnerabilities.length === 0) {
      report += '✅ **No critical vulnerabilities detected!**\n\n';
    } else {
      this.vulnerabilities.forEach((vuln, i) => {
        report += `### ${i + 1}. ${vuln.issue}
**Severity:** ${vuln.level}
**File:** ${vuln.file || vuln.path || 'Multiple'}
**Fix:** ${vuln.fix}
${vuln.details ? `**Details:** ${vuln.details}` : ''}
${vuln.keys ? `**Exposed Keys:** ${vuln.keys.join(', ')}` : ''}

`;
      });
    }

    report += '## ⚠️ WARNINGS & RECOMMENDATIONS\n';
    
    if (this.warnings.length === 0) {
      report += '✅ **No warnings detected!**\n\n';
    } else {
      this.warnings.forEach((warning, i) => {
        report += `### ${i + 1}. ${warning.issue}
**Severity:** ${warning.level}
**Fix:** ${warning.fix}
${warning.details ? `**Details:** ${warning.details}` : ''}

`;
      });
    }

    report += `## 🎯 SECURITY SCORE
`;

    const criticalCount = this.vulnerabilities.filter(v => v.level === 'CRITICAL').length;
    const highCount = this.vulnerabilities.filter(v => v.level === 'HIGH').length;
    
    if (criticalCount === 0 && highCount === 0) {
      report += '🟢 **EXCELLENT** - Production ready\n';
    } else if (criticalCount === 0 && highCount <= 2) {
      report += '🟡 **GOOD** - Minor issues to address\n';
    } else if (criticalCount <= 2) {
      report += '🟠 **NEEDS ATTENTION** - Important issues to fix\n';
    } else {
      report += '🔴 **CRITICAL** - Do not deploy until fixed\n';
    }

    report += `
## 📋 NEXT STEPS
1. **Immediate:** Fix all CRITICAL vulnerabilities
2. **Short-term:** Address HIGH and MEDIUM issues  
3. **Long-term:** Implement security best practices
4. **Monitor:** Run this check weekly

---
*Automated Security Monitor for Relo Network*
*Report generated: ${timestamp}*
`;

    fs.writeFileSync(this.reportPath, report);
    console.log(`📄 Security report generated: ${this.reportPath}`);
    
    return {
      vulnerabilities: this.vulnerabilities.length,
      warnings: this.warnings.length,
      reportPath: this.reportPath
    };
  }

  // Main security scan
  async runScan() {
    console.log('🚀 Starting automated security scan...\n');
    
    this.checkEnvironmentSecurity();
    this.checkEndpointSecurity();
    this.checkDependencies();
    this.checkSecurityHeaders();
    
    const results = this.generateReport();
    
    console.log('\n✅ Security scan complete!');
    console.log(`📊 Found ${results.vulnerabilities} vulnerabilities and ${results.warnings} warnings`);
    console.log(`📄 Report saved to: ${results.reportPath}`);
    
    // Return exit code based on severity
    if (results.vulnerabilities > 0) {
      console.log('🔴 CRITICAL ISSUES FOUND - Please review and fix');
      process.exit(1);
    } else if (results.warnings > 0) {
      console.log('🟡 Warnings found - Review recommended');
      process.exit(0);
    } else {
      console.log('🟢 All security checks passed!');
      process.exit(0);
    }
  }
}

// Auto-fix common issues
class SecurityAutoFix {
  static async fixEnvironmentFiles() {
    try {
      execSync('git rm --cached .env.local .env.production 2>/dev/null || true');
      console.log('✅ Removed environment files from git tracking');
    } catch (e) {
      // Already removed
    }
  }

  static async fixGitignore() {
    const gitignorePath = '.gitignore';
    let gitignore = '';
    
    if (fs.existsSync(gitignorePath)) {
      gitignore = fs.readFileSync(gitignorePath, 'utf8');
    }
    
    const requiredEntries = [
      '.env*.local',
      '.env.production',
      '.env.staging'
    ];
    
    let modified = false;
    requiredEntries.forEach(entry => {
      if (!gitignore.includes(entry)) {
        gitignore += `\n${entry}`;
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(gitignorePath, gitignore);
      console.log('✅ Updated .gitignore with environment file patterns');
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--fix')) {
    console.log('🔧 Running auto-fix...');
    SecurityAutoFix.fixEnvironmentFiles();
    SecurityAutoFix.fixGitignore();
  }
  
  const monitor = new SecurityMonitor();
  monitor.runScan();
}

module.exports = { SecurityMonitor, SecurityAutoFix };