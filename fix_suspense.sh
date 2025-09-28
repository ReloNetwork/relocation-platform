#!/bin/bash

# Files that need Suspense fixes
files=(
  "app/corporate/test-payment/page.tsx"
  "app/corporate/payment/success/page.tsx" 
  "app/corporate/payment/page.tsx"
  "app/corporate/payment-simple/page.tsx"
  "app/corporate/payment-clean/page.tsx"
  "app/directory/welcome/page.tsx"
  "app/partners/welcome/page.tsx"
  "app/partners/onboard/success/page.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    
    # Backup original
    cp "$file" "$file.bak"
    
    # Check if file uses useSearchParams
    if grep -q "useSearchParams" "$file"; then
      # Add Suspense import
      sed -i '' "s/'use client'/'use client'\n\nimport { Suspense } from 'react'/" "$file"
      
      # Find the component name and wrap it
      component_name=$(grep -o "export default function [A-Za-z]*" "$file" | sed 's/export default function //')
      
      if [ ! -z "$component_name" ]; then
        # Rename the original component
        sed -i '' "s/export default function $component_name/function ${component_name}Content/" "$file"
        
        # Add new default export with Suspense
        echo "
export default function $component_name() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <${component_name}Content />
    </Suspense>
  )
}" >> "$file"
      fi
    fi
  fi
done
