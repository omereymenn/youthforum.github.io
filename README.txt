KAIHL YOUTH FORUM — WEBSITE SOURCE FILES
======================================

FILES
  index.html             Website entry point (upload to your domain's document root)
  styles.css             All colors, typography, responsive layout and animations
  script.js              Navigation, academy filters, pop-up details and scroll effects
  academies.js           Ten academies, agenda descriptions, USG and ACAS names
  assets/...logo.jpg     Official logo supplied by the organizers

HOW TO OPEN LOCALLY
  Open index.html using a web browser. Internet access is not required.

HOW TO PUBLISH ON youthforum.kaihl.com (typical cPanel hosting)
  1) Ask the kaihl.com domain/hosting admin to create a separate subdomain:
       youthforum.kaihl.com
  2) Make sure the subdomain's document root is separate from the main school site.
  3) Upload the CONTENTS of this folder (not an extra nested folder) into that document root.
     index.html must be directly inside the document root.
  4) Confirm that the DNS record points to the correct hosting service.
  5) Enable a valid SSL/TLS certificate and test https://youthforum.kaihl.com.

HOW TO PUBLISH WITH NETLIFY
  1) Drag this folder into Netlify Drop, or create a Netlify project.
  2) Add youthforum.kaihl.com under Domain management.
  3) Have the kaihl.com DNS administrator create the DNS record that Netlify requires.
  4) Wait for domain verification and HTTPS provisioning.

EDITING CONTENT
  - To rename, add or edit academies: open academies.js and edit FORUM_ACADEMIES.
  - To add secretariat names: search for 'Leadership name to be announced' and
    'Names to be announced' in index.html and replace the placeholders.
  - To add contact details: find 'Contact details' in index.html.
  - To customize colors: edit CSS variables at the top of styles.css.
  - Procedure is intentionally a placeholder until the official rules are supplied.
  - Academy topics and USG/ACAS are derived from the supplied PDF.
  - The final agenda entry is called 'Case06' in the supplied PDF even though it
    appears after Case09. It is displayed as academy 10 for navigation and is
    explicitly noted in the site. Please confirm the official numbering.

IMPORTANT
  - No personal contact addresses, event date, registration links or unconfirmed
    team names have been invented.
  - This is a static website: actual registration, email sending or databases
    require additional backend or third-party services.
  - Preserve the original logo's attribution and permission to use it.
  - Never place hosting passwords or admin secrets inside site files.
