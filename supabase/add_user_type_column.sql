-- Add user_type column to existing ai_talent_submissions table
ALTER TABLE ai_talent_submissions 
ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'company' 
CHECK (user_type IN ('company', 'individual'));

-- Create index on user_type for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_talent_user_type ON ai_talent_submissions(user_type);

-- Update any existing records to have 'company' as default
UPDATE ai_talent_submissions 
SET user_type = 'company' 
WHERE user_type IS NULL;