#!/usr/bin/env python3
import os
import glob

# Emoji to FontAwesome mapping
emoji_mapping = {
    "🎮": '<i class="fas fa-gamepad"></i>',
    "🔖": '<i class="fas fa-bookmark"></i>',
    "🏆": '<i class="fas fa-trophy"></i>',
    "🔬": '<i class="fas fa-microscope"></i>',
    "🧪": '<i class="fas fa-flask"></i>',
    "➕": '<i class="fas fa-plus"></i>',
    "📚": '<i class="fas fa-book"></i>',
    "🔓": '<i class="fas fa-lock-open"></i>',
    "🔒": '<i class="fas fa-lock"></i>',
    "⚡": '<i class="fas fa-bolt"></i>',
    "📊": '<i class="fas fa-chart-bar"></i>',
    "🎯": '<i class="fas fa-bullseye"></i>',
    "📝": '<i class="fas fa-pencil-alt"></i>',
    "⚛️": '<i class="fas fa-atom"></i>',
    "📜": '<i class="fas fa-scroll"></i>',
    "🌍": '<i class="fas fa-globe-americas"></i>',
    "⚠️": '<i class="fas fa-exclamation-triangle"></i>',
    "💪": '<i class="fas fa-dumbbell"></i>',
    "🌙": '<i class="fas fa-moon"></i>',
    "☀️": '<i class="fas fa-sun"></i>',
}


def replace_emojis_in_html():
    html_files = glob.glob("**/*.html", recursive=True)

    for file_path in html_files:
        with open(file_path, "r") as f:
            content = f.read()

        # Replace emojis
        new_content = content
        for emoji, fa_icon in emoji_mapping.items():
            new_content = new_content.replace(emoji, fa_icon)

        # Write back if changed
        if new_content != content:
            with open(file_path, "w") as f:
                f.write(new_content)
            print(f"Updated {file_path}")
        else:
            print(f"No changes needed for {file_path}")


if __name__ == "__main__":
    replace_emojis_in_html()
