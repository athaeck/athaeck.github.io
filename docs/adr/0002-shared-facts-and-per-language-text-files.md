# Content split into shared facts and per-language text, mirroring Strapi field localization

Each content entry is one shared YAML file for facts (dates, links, references, image files) plus one Markdown file per language for text, joined by an identical filename. We rejected one full file per language, where facts would be duplicated and drift apart, and one file holding `{de, en}` per text field, which does not map 1:1 onto Strapi: Strapi stores each locale as its own entry and localizes per field. The split mirrors Strapi's "Enable localization for this field" switch, so a later move to self-hosted Strapi is a mechanical import, not a remodel.

## Consequences

- Strapi localizes components (lists of sub-objects) only as a whole. Any list that contains text (`phases`, `gallery`, `contributions`, `learnings`, `services`, `languages`, `interests`, `timeline`, `next`) therefore lives entirely in the language files, and its facts, such as phase dates or gallery image files, are duplicated per language.
- Because duplicated facts can drift, a Content check compares every text list across the two languages: the same number of entries and the same facts, or the build stops.
- A single image stays shared; its alt text is a separate localized field next to it.
- Skill has no language files; Page has no shared file.
