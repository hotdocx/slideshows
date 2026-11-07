# Authoring source

`course.json` preserves the original definitions, LaTeX, displayed text,
narration and teaching actions. Its canonical compact-JSON SHA-256 is
`e33c81567493b0143d10f49c18907fa04e7f47fa73b8ef89ba48978d9dae5364`.
The source book is a separate project, not part of this audience repository.

The finished, independently replayable package is in
`site/emdash-rhpl-2026/`. Its manifest retains the measured chapter and unit
frame boundaries. Narration is already supplied there as
`presentation/assets/voice.m4a`; recovery encoded it from the unchanged retained
movie master. Original individual provider WAVs were unavailable. Reuse the
retained narration for visual-only work. Provider settings in the original
course record are provenance, not authorization to generate new speech.

Use the canonical source/seminar/native exporter in GetPaidX CRM or its installed
`getpaidx-media` workspace CLI when preparing an updated native package. Preserve
source bindings, measured timing and disclosure; attach imported retained audio
before rendering. Never infer new word timestamps from text. Refresh all declared
hashes and the package fingerprint after an intentional change.

Only `site/` is deployed to Pages. This source directory is optional editing
material for the AI workspace and is not a runtime dependency of the package.
Other presentations may use their own authoring tools and source layout.
