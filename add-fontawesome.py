#!/usr/bin/env python3
import os
import glob


# Find all HTML files
def add_fontawesome_to_html_files():
    html_files = glob.glob("**/*.html", recursive=True)

    for file_path in html_files:
        # Skip files that already have FontAwesome
        with open(file_path, "r") as f:
            content = f.read()
            if "font-awesome" in content or "fontawesome" in content:
                print(f"Skipping {file_path} - already has FontAwesome")
                continue

        # Add FontAwesome CDN after existing stylesheets
        lines = content.split("\n")
        new_lines = []
        added = False

        for line in lines:
            new_lines.append(line)
            if '<link rel="stylesheet"' in line and "katex" not in line and not added:
                new_lines.append(
                    '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">'
                )
                added = True

        if not added:
            # If no stylesheet found, add after head tag
            for i, line in enumerate(new_lines):
                if "<head>" in line:
                    new_lines.insert(
                        i + 1,
                        '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">',
                    )
                    break

        # Write back
        with open(file_path, "w") as f:
            f.write("\n".join(new_lines))

        print(f"Updated {file_path}")


if __name__ == "__main__":
    add_fontawesome_to_html_files()
