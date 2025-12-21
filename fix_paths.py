import os
import re

directory = 'react_guide'
print(f"Scanning directory: {directory}")
favicon_tag = '<link rel="icon" href="/assets/img/avatar-fallback.svg">'

if not os.path.exists(directory):
    print(f"Directory not found: {directory}")
    exit(1)

# Regex for replacing relative html links
# Matches href="something.html" but not starting with http, https, //, or /
link_pattern = re.compile(r'href="(?!(?:http|https|//|/))([^"]+\.html)"')

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        print(f"Processing {filepath}")
        with open(filepath, 'r') as f:
            content = f.read()
        
        new_content = content
        
        # Fix CSS path
        if 'href="styles.css"' in new_content:
            print(f"  Found styles.css in {filename}")
            new_content = new_content.replace('href="styles.css"', 'href="/react_guide/styles.css"')
            
        # Fix JS path
        if 'src="layout.js"' in new_content:
            print(f"  Found layout.js in {filename}")
            new_content = new_content.replace('src="layout.js"', 'src="/react_guide/layout.js"')
            
        # Add Favicon if missing
        if 'rel="icon"' not in new_content:
            print(f"  Missing favicon in {filename}")
            # Try to insert before the stylesheet link we just updated
            if '<link rel="stylesheet" href="/react_guide/styles.css">' in new_content:
                new_content = new_content.replace('<link rel="stylesheet" href="/react_guide/styles.css">', f'{favicon_tag}\n    <link rel="stylesheet" href="/react_guide/styles.css">')
            # Fallback: insert before closing head tag
            elif '</head>' in new_content:
                new_content = new_content.replace('</head>', f'    {favicon_tag}\n</head>')

        # Fix relative HTML links
        # We use a callback to print what we are replacing
        def replace_link(match):
            print(f"  Fixing link: {match.group(1)} -> /react_guide/{match.group(1)}")
            return f'href="/react_guide/{match.group(1)}"'
            
        new_content = link_pattern.sub(replace_link, new_content)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes for {filename}")
