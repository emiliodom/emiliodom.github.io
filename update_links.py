import os
import re

directory = 'react_guide'
print(f"Scanning directory: {directory}")
favicon_tag = '<link rel="icon" href="/assets/img/avatar-fallback.svg">'

if not os.path.exists(directory):
    print(f"Directory not found: {directory}")
    exit(1)

# Regex for replacing relative html links
# Matches href="moduleX.html" or "index.html" etc.
# We want to avoid matching things that already start with /react_guide/ or http
link_pattern = re.compile(r'href="(?!(?:http|https|//|/))([^"]+\.html)"')

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        print(f"Processing {filepath}")
        with open(filepath, 'r') as f:
            content = f.read()
        
        new_content = content
        
        # Fix CSS path
        if 'href="../assets/css/styles.css"' in new_content:
            print("  Found relative CSS path")
            new_content = new_content.replace('href="../assets/css/styles.css"', 'href="/react_guide/styles.css"')
        
        if 'href="styles.css"' in new_content:
             print("  Found sibling CSS path")
             new_content = new_content.replace('href="styles.css"', 'href="/react_guide/styles.css"')

        # Fix JS path
        if 'src="../assets/js/layout.js"' in new_content:
            print("  Found relative JS path")
            new_content = new_content.replace('src="../assets/js/layout.js"', 'src="/react_guide/layout.js"')
        
        if 'src="layout.js"' in new_content:
            print("  Found sibling JS path")
            new_content = new_content.replace('src="layout.js"', 'src="/react_guide/layout.js"')
            
        # Add Favicon if missing
        if 'rel="icon"' not in new_content:
            print("  Injecting favicon")
            # Try to insert before the stylesheet link
            if '<link rel="stylesheet" href="/react_guide/styles.css">' in new_content:
                new_content = new_content.replace('<link rel="stylesheet" href="/react_guide/styles.css">', f'{favicon_tag}\n    <link rel="stylesheet" href="/react_guide/styles.css">')
            # Fallback: insert before closing head tag
            elif '</head>' in new_content:
                new_content = new_content.replace('</head>', f'    {favicon_tag}\n</head>')

        # Fix relative HTML links to absolute /react_guide/...
        def replace_link(match):
            print(f"  Fixing link: {match.group(1)}")
            return f'href="/react_guide/{match.group(1)}"'
            
        new_content = link_pattern.sub(replace_link, new_content)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filename}")
        else:
            print(f"No changes for {filename}")
