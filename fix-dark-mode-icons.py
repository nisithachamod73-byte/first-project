#!/usr/bin/env python3
"""
Script to fix dark mode toggle icons in all HTML files.
Replaces textContent with innerHTML for FontAwesome icon rendering.
"""

import os
import re


def fix_html_file(filepath):
    """Fix textContent to innerHTML in a single HTML file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Count replacements
    original_count = content.count("textContent")

    # Replace textContent with innerHTML for FontAwesome icon assignments
    # Pattern: textContent = '<i class="fas fa-...
    pattern = r'(\w+\.textContent)\s*=\s*([\'\"])<i class="fas fa-[^\'\"]+\2'

    def replacement(match):
        var_name = match.group(1)
        quote = match.group(2)
        return (
            var_name.replace("textContent", "innerHTML")
            + " = "
            + quote
            + match.group(0).split(quote)[-2]
            + quote
        )

    content = re.sub(pattern, replacement, content)

    # Also replace simple assignments
    content = content.replace(
        "icon.textContent = '<i class=\"fas fa-sun\"></i>'",
        "icon.innerHTML = '<i class=\"fas fa-sun\"></i>'",
    )
    content = content.replace(
        "icon.textContent = isNowDark ? '<i class=\"fas fa-sun\"></i>' : '<i class=\"fas fa-moon\"></i>'",
        "icon.innerHTML = isNowDark ? '<i class=\"fas fa-sun\"></i>' : '<i class=\"fas fa-moon\"></i>'",
    )

    # Replace side quest status icons
    content = content.replace(
        "textContent = '<i class=\"fas fa-lock-open\"></i>'",
        "innerHTML = '<i class=\"fas fa-lock-open\"></i>'",
    )

    new_count = content.count("textContent")
    replacements_made = original_count - new_count

    if replacements_made > 0:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✅ Fixed {replacements_made} instances in {filepath}")
        return replacements_made
    else:
        print(f"ℹ️  No changes needed in {filepath}")
        return 0


def main():
    """Main function to fix all HTML files."""
    html_files = []

    # Find all HTML files
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))

    total_replacements = 0
    files_fixed = 0

    print(f"🔍 Found {len(html_files)} HTML files")

    for filepath in html_files:
        if (
            "deployment-test.html" in filepath
            or "debug-theme" in filepath
            or "test-theme" in filepath
        ):
            continue  # Skip test files

        replacements = fix_html_file(filepath)
        if replacements > 0:
            total_replacements += replacements
            files_fixed += 1

    print(f"\n🎯 Summary:")
    print(f"   Files fixed: {files_fixed}/{len(html_files)}")
    print(f"   Total replacements: {total_replacements}")

    if files_fixed > 0:
        print("\n✅ Dark mode icon fixes applied successfully!")
    else:
        print("\nℹ️  No files needed fixing.")


if __name__ == "__main__":
    main()
