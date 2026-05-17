import os
import glob

files = glob.glob('src/**/*.jsx', recursive=True)

replacements = {
    'text-[#FFD400]': 'text-accent',
    'bg-[#FFD400]': 'bg-accent',
    'bg-[#FFD400]/10': 'bg-accent/10',
    'bg-[#FFD400]/20': 'bg-accent/20',
    'bg-[#FFD400]/30': 'bg-accent/30',
    'border-[#FFD400]/10': 'border-accent/10',
    'border-[#FFD400]/20': 'border-accent/20',
    'border-[#FFD400]/30': 'border-accent/30',
    'border-[#FFD400]/50': 'border-accent/50',
    'from-[#FFD400]/10': 'from-accent/10',
    'from-[#FFD400]': 'from-accent',
    '#FFD400': 'var(--theme-accent)',
}

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    for k, v in replacements.items():
        content = content.replace(k, v)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Color refactor complete.")
