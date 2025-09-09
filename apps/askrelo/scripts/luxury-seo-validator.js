/**
 * Relo Network - Luxury SEO Validation Script
 * Validates schema markup, meta tags, and luxury brand consistency
 */

const fs = require('fs');
const path = require('path');

// Luxury brand validation rules
const LUXURY_BRAND_RULES = {
  requiredColors: ['#0B1B2B', '#C9A24A', '#FAFAF9'],
  requiredFonts: ['Playfair Display', 'Inter'],
  requiredKeywords: [
    'luxury',
    'exclusive',
    'premium', 
    'elite',
    'vetted',
    'discerning',
    'sophisticated'
  ],
  luxuryLanguage: [
    'most exclusive',
    'premier',
    'high-net-worth',
    'Fortune 500',
    'white-glove',
    'VIP',
    'elite services'
  ]
};

// Schema validation rules
const SCHEMA_REQUIREMENTS = {
  Organization: ['name', 'description', 'url', 'logo', 'contactPoint', 'address'],
  LocalBusiness: ['name', 'address', 'telephone', 'openingHours'],
  WebSite: ['name', 'url', 'potentialAction'],
  Service: ['name', 'provider', 'areaServed'],
  FAQPage: ['mainEntity'],
  BreadcrumbList: ['itemListElement']
};

// SEO best practices for luxury brands
const LUXURY_SEO_RULES = {
  titleLength: { min: 30, max: 60 },
  descriptionLength: { min: 120, max: 160 },
  keywordDensity: { min: 1, max: 3 }, // percentage
  luxuryTerms: { min: 2 }, // minimum luxury terms per page
  headingStructure: true, // must have proper H1-H6 hierarchy
  schemaCompliance: 100 // percentage of required schema fields
};

class LuxurySEOValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passes = [];
    this.luxuryScore = 0;
  }

  // Validate luxury brand consistency
  validateLuxuryBranding(content) {
    console.log('🎩 Validating luxury brand consistency...');
    
    // Check for luxury colors
    const colorMatches = LUXURY_BRAND_RULES.requiredColors.filter(color => 
      content.includes(color)
    );
    
    if (colorMatches.length === LUXURY_BRAND_RULES.requiredColors.length) {
      this.passes.push('✅ All luxury brand colors present');
      this.luxuryScore += 20;
    } else {
      this.warnings.push(`⚠️  Missing luxury colors: ${LUXURY_BRAND_RULES.requiredColors.filter(c => !colorMatches.includes(c))}`);
    }

    // Check for luxury fonts
    const fontMatches = LUXURY_BRAND_RULES.requiredFonts.filter(font => 
      content.includes(font)
    );
    
    if (fontMatches.length === LUXURY_BRAND_RULES.requiredFonts.length) {
      this.passes.push('✅ Luxury typography implemented');
      this.luxuryScore += 15;
    } else {
      this.warnings.push(`⚠️  Missing luxury fonts: ${LUXURY_BRAND_RULES.requiredFonts.filter(f => !fontMatches.includes(f))}`);
    }

    // Check for luxury language
    const luxuryLanguageCount = LUXURY_BRAND_RULES.luxuryLanguage.filter(term =>
      content.toLowerCase().includes(term.toLowerCase())
    ).length;

    if (luxuryLanguageCount >= 3) {
      this.passes.push('✅ Luxury language appropriately used');
      this.luxuryScore += 25;
    } else {
      this.warnings.push(`⚠️  Insufficient luxury language terms (${luxuryLanguageCount}/3 minimum)`);
    }
  }

  // Validate schema markup
  validateSchemaMarkup(filePath) {
    console.log('🔍 Validating schema markup...');
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Find all schema objects
      const schemaRegex = /@context.*?https:\/\/schema\.org.*?@type.*?([A-Za-z]+)/g;
      const schemas = [];
      let match;
      
      while ((match = schemaRegex.exec(content)) !== null) {
        schemas.push(match[1]);
      }

      if (schemas.length === 0) {
        this.errors.push('❌ No schema markup found');
        return;
      }

      this.passes.push(`✅ Found ${schemas.length} schema types: ${schemas.join(', ')}`);
      this.luxuryScore += 20;

      // Validate required schema types for luxury positioning
      const requiredSchemas = ['Organization', 'LocalBusiness', 'WebSite'];
      const missingSchemas = requiredSchemas.filter(schema => !schemas.includes(schema));
      
      if (missingSchemas.length === 0) {
        this.passes.push('✅ All core luxury schemas present');
        this.luxuryScore += 15;
      } else {
        this.warnings.push(`⚠️  Missing core schemas: ${missingSchemas.join(', ')}`);
      }

    } catch (error) {
      this.errors.push(`❌ Error reading schema file: ${error.message}`);
    }
  }

  // Validate SEO meta tags
  validateSEOMetaTags(content) {
    console.log('🏷️  Validating SEO meta tags...');
    
    // Check for essential meta tags
    const essentialTags = [
      'meta name="description"',
      'meta name="keywords"',
      'meta property="og:title"',
      'meta property="og:description"',
      'meta name="twitter:card"'
    ];

    essentialTags.forEach(tag => {
      if (content.includes(tag)) {
        this.passes.push(`✅ ${tag} present`);
      } else {
        this.warnings.push(`⚠️  Missing ${tag}`);
      }
    });

    // Check for luxury-specific meta tags
    const luxuryTags = [
      'theme-color',
      'msapplication-TileColor',
      'apple-mobile-web-app-capable'
    ];

    const luxuryTagsPresent = luxuryTags.filter(tag => content.includes(tag));
    
    if (luxuryTagsPresent.length >= 2) {
      this.passes.push('✅ Luxury mobile experience tags present');
      this.luxuryScore += 10;
    } else {
      this.warnings.push(`⚠️  Limited luxury mobile tags: ${luxuryTagsPresent.join(', ')}`);
    }
  }

  // Validate luxury content quality
  validateLuxuryContent(content) {
    console.log('💎 Validating luxury content quality...');
    
    const luxuryKeywords = LUXURY_BRAND_RULES.requiredKeywords;
    const luxuryKeywordMatches = luxuryKeywords.filter(keyword =>
      content.toLowerCase().includes(keyword.toLowerCase())
    ).length;

    if (luxuryKeywordMatches >= 4) {
      this.passes.push(`✅ Strong luxury positioning (${luxuryKeywordMatches}/${luxuryKeywords.length} keywords)`);
      this.luxuryScore += 15;
    } else {
      this.warnings.push(`⚠️  Weak luxury positioning (${luxuryKeywordMatches}/${luxuryKeywords.length} keywords)`);
    }

    // Check for premium pricing language
    const pricingPatterns = [/£\d{2,}/g, /\d+\/mo/g, /\d+\s*per\s*month/g];
    const pricingMatches = pricingPatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);

    if (pricingMatches >= 3) {
      this.passes.push('✅ Premium pricing clearly displayed');
      this.luxuryScore += 10;
    } else {
      this.warnings.push(`⚠️  Limited pricing visibility (${pricingMatches} instances)`);
    }
  }

  // Main validation function
  async validateLuxuryPlatform() {
    console.log('\n🎩 RELO NETWORK LUXURY SEO VALIDATION\n' + '='.repeat(50));
    
    const appDir = path.join(__dirname, '../app');
    const libDir = path.join(__dirname, '../lib');
    
    try {
      // Read main configuration files
      const configPath = path.join(libDir, 'seo/config.ts');
      const schemaPath = path.join(libDir, 'seo/luxury-schemas.ts');
      const layoutPath = path.join(appDir, 'layout.tsx');
      
      if (fs.existsSync(configPath)) {
        const configContent = fs.readFileSync(configPath, 'utf8');
        this.validateLuxuryBranding(configContent);
        this.validateSEOMetaTags(configContent);
        this.validateLuxuryContent(configContent);
      }
      
      if (fs.existsSync(schemaPath)) {
        this.validateSchemaMarkup(schemaPath);
      }
      
      if (fs.existsSync(layoutPath)) {
        const layoutContent = fs.readFileSync(layoutPath, 'utf8');
        this.validateLuxuryBranding(layoutContent);
      }

      // Generate final report
      this.generateLuxuryReport();
      
    } catch (error) {
      this.errors.push(`❌ Validation error: ${error.message}`);
    }
  }

  // Generate comprehensive luxury SEO report
  generateLuxuryReport() {
    console.log('\n📊 LUXURY SEO VALIDATION REPORT\n' + '='.repeat(50));
    
    // Calculate luxury score
    const maxScore = 115; // Total possible points
    const percentage = Math.round((this.luxuryScore / maxScore) * 100);
    
    console.log(`\n🎯 LUXURY BRAND SCORE: ${this.luxuryScore}/${maxScore} (${percentage}%)\n`);
    
    // Luxury score interpretation
    if (percentage >= 90) {
      console.log('🏆 EXCEPTIONAL: Your luxury positioning is outstanding!');
    } else if (percentage >= 75) {
      console.log('💎 EXCELLENT: Strong luxury brand implementation');
    } else if (percentage >= 60) {
      console.log('⭐ GOOD: Solid luxury foundation with room for enhancement');
    } else {
      console.log('⚠️  NEEDS IMPROVEMENT: Luxury positioning requires attention');
    }

    console.log('\n✅ PASSES:');
    this.passes.forEach(pass => console.log(`  ${pass}`));
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.warnings.forEach(warning => console.log(`  ${warning}`));
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.errors.forEach(error => console.log(`  ${error}`));
    }

    // Luxury optimization recommendations
    console.log('\n💡 LUXURY OPTIMIZATION RECOMMENDATIONS:');
    
    if (percentage < 85) {
      console.log('  • Enhance luxury language throughout content');
      console.log('  • Implement more premium positioning keywords');
      console.log('  • Add sophisticated visual elements and colors');
    }
    
    if (this.errors.length > 0) {
      console.log('  • Fix critical errors before deployment');
    }
    
    if (percentage >= 90) {
      console.log('  • Consider A/B testing luxury messaging variants');
      console.log('  • Expand premium content sections');
      console.log('  • Implement advanced schema markup for authority');
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎩 Luxury validation complete. Maintain premium standards!');
    
    // Exit with appropriate code
    process.exit(this.errors.length > 0 ? 1 : 0);
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new LuxurySEOValidator();
  validator.validateLuxuryPlatform();
}

module.exports = LuxurySEOValidator;