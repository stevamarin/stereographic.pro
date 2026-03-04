# Client Tracking Setup Guide — StereoGraphic Production

## 1. Formspree Setup (Contact Form Backend)

Your website contact form submits to Formspree. Here's how to set it up:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — you'll get a form ID like `xpzvqkdl`
3. Open `app/sections/FooterSection.tsx` and replace `YOUR_FORM_ID` with your actual ID:
   ```
   https://formspree.io/f/YOUR_FORM_ID  →  https://formspree.io/f/xpzvqkdl
   ```
4. Enable email notifications in Formspree dashboard (Settings → Notifications)
5. Free tier: 50 submissions/month — more than enough to start

## 2. Google Sheets Lead Tracker

Create a Google Sheet with these columns to track every inquiry:

| Column | Description |
|--------|-------------|
| **Date** | When the inquiry came in |
| **Name** | Client name |
| **Email** | Client email |
| **Project Type** | Music Video, Commercial, Film, Game Audio, Podcast/Content, Other |
| **Budget** | Under $500, $500-$1,500, $1,500-$5,000, $5,000+ |
| **Message** | Brief project description |
| **Status** | New → Contacted → Quoted → In Progress → Completed → Lost |
| **Follow-up Date** | When to follow up next |
| **Notes** | Your internal notes |

### Quick Setup:
1. Open Google Sheets → Create new spreadsheet
2. Name it "StereoGraphic Leads 2026"
3. Add the column headers above to Row 1
4. Freeze Row 1 (View → Freeze → 1 row)
5. Add data validation to the Status column:
   - Select the Status column → Data → Data validation
   - Criteria: List of items → `New, Contacted, Quoted, In Progress, Completed, Lost`
6. Color-code statuses using conditional formatting for quick scanning

## 3. Lead Follow-Up Workflow

When a new form submission comes in:

1. **Within 2 hours**: Add to Google Sheet, send a personalized reply
2. **Day 1**: If they replied, schedule a call. If not, no action yet.
3. **Day 3**: If no reply to your first email, send a gentle follow-up
4. **Day 7**: Final follow-up. If no reply, mark as "Lost" and move on.

### Email Templates

**Initial Reply (send within 2 hours):**
```
Subject: Re: Your [Project Type] project — StereoGraphic

Hi [Name],

Thanks for reaching out! I'd love to learn more about your [project type] project.

A few quick questions to help me put together an accurate quote:
- What's the rough timeline?
- Do you have reference tracks or examples of the sound/style you're going for?
- How many minutes of final audio are we looking at?

Happy to jump on a quick call if that's easier — just let me know what works.

Best,
Stevan
StereoGraphic Production
```

**Follow-up (Day 3, no reply):**
```
Subject: Quick follow-up — StereoGraphic

Hi [Name],

Just wanted to follow up on your inquiry. I know things get busy!

If you're still looking for audio help on your project, I'd love to chat. No pressure either way.

Best,
Stevan
```

## 4. Optional: Formspree → Google Sheets Automation

You can auto-populate your Google Sheet from Formspree submissions using Zapier (free tier):

1. Create a Zapier account at [zapier.com](https://zapier.com)
2. New Zap: Trigger = "New Email" in Gmail (Formspree notifications) → Action = "Create Spreadsheet Row" in Google Sheets
3. Map the fields from the email body to your spreadsheet columns

Alternatively, Formspree Pro ($10/mo) has direct Google Sheets integration.
