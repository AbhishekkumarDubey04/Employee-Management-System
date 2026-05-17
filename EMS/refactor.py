import os

files = [
    'src/pages/Employees.jsx', 
    'src/pages/Projects.jsx', 
    'src/pages/Analytics.jsx', 
    'src/pages/Auth.jsx',
    'src/pages/PlaceholderPage.jsx'
]

replacements = {
    'text-white': 'text-text',
    'bg-[#050505]': 'bg-bg',
    'bg-white/5': 'bg-glass',
    'bg-white/10': 'bg-glass-hover',
    'border-white/10': 'border-border',
    'border-white/5': 'border-border',
    'text-gray-400': 'text-muted',
    'text-gray-500': 'text-muted',
    'text-gray-300': 'text-muted',
    'bg-white/[0.02]': 'bg-glass',
    'bg-white/[0.01]': 'bg-glass',
    'bg-white/[0.03]': 'bg-glass',
    'bg-white/[0.05]': 'bg-glass-hover',
    'bg-[#0A0A0A]/80': 'bg-card'
}

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    for k, v in replacements.items():
        content = content.replace(k, v)
        
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Refactor complete.")
