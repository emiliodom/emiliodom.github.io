import os
import datetime

base_url = "https://emiliodom.github.io/"
date_str = "2025-12-22"

guides = {
    "devops_guide": [],
    "moodle_guide": [],
    "python_guide": [],
    "nextjs_guide": [],
    "react_guide": [],
    "laravel_guide": [],
    "wordpress_guide": []
}

# Walk through directories
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html") and not file.startswith("_") and "assets" not in root:
            path = os.path.join(root, file)
            # Remove ./
            clean_path = path[2:]
            
            # Check if it belongs to a guide
            parts = clean_path.split("/")
            if len(parts) > 1 and parts[0] in guides:
                # Include all files including index.html and quiz.html
                guides[parts[0]].append(clean_path)

for guide, files in guides.items():
    print(f"  <!-- {guide.replace('_', ' ').title()} Pages -->")
    for f in sorted(files):
        print(f"  <url>")
        print(f"    <loc>{base_url}{f}</loc>")
        print(f"    <lastmod>{date_str}</lastmod>")
        print(f"    <changefreq>monthly</changefreq>")
        print(f"    <priority>0.7</priority>")
        print(f"  </url>")
    print("")

