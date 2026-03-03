# GA4 Tracking Framework for Service Design Conference
## Robust Technical Implementation & Enterprise Architecture

**Project**: Annual Service Design Conference Platform  
**Platform**: Event Management System with Ticketing + Content Management  
**Implementation**: GA4 + Google Tag Manager (Client-Side + Server-Side)  
**Scope**: 5,000+ attendees, 3-day event, 50+ sessions, $2.5M annual revenue  
**Date Created**: March 2026

---

## Executive Overview

### Business Context
A Service Design conference attracts 5,000 global attendees annually, generating $2.5M in ticket revenue, sponsorships, and merchandise. Success depends on:
- **Early Bird Conversion**: 45% of annual revenue comes from 30-day pre-launch window
- **Session Selection**: Understanding which tracks drive attendee satisfaction and retention
- **Sponsor ROI**: Proving sponsor booth engagement translates to lead quality
- **Post-Event Outcomes**: 60% of leads should convert to consulting contracts within 90 days

### GA4 Tracking Goals
1. **Funnel Analysis**: Registration → Ticket Purchase → Check-in → Session Attendance → Post-Event Engagement
2. **Attribution**: Which marketing channels drive highest-LTV attendees (paid ads vs. email vs. organic)
3. **Engagement Scoring**: Real-time attendee engagement (session views, Q&A participation, sponsor interaction)
4. **Cohort Analysis**: Repeat attendees vs. first-timers, revenue per cohort
5. **Sponsor Performance**: Track sponsor booth views, lead captures, contact submissions

### Expected Business Impact
- **Revenue Optimization**: A/B test early bird pricing → 12-15% conversion uplift
- **Sponsorship Value**: Data-driven sponsor ROI reports → 25% higher renewal rate
- **Content Strategy**: Session selection insights → improve next year's track mix
- **Lead Quality**: Track post-event outcomes → $425K additional consulting revenue annually

---

## Full Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONFERENCE ATTENDEE JOURNEY                   │
└─────────────────────────────────────────────────────────────────┘

[1] AWARENESS PHASE (30-60 days before event)
    ├─ Web Site Visit (blog, homepage) → track intent signals
    ├─ Email Campaign (3 sequences) → track email-driven behavior
    ├─ Paid Ads (Google Ads, LinkedIn, Facebook) → track ad_click source
    └─ Organic Search (conference name, track topics) → track source

            ↓ DATA LAYER: pageview event with referrer

[2] CONSIDERATION PHASE (30 days before - event start)
    ├─ Open Ticket Page → page_view event
    ├─ View Session Schedule → scroll event + session_viewed
    ├─ Read Speaker Bios → article_engaged event  
    ├─ Download Agenda PDF → file_download event
    └─ Sign Up for Updates → form_submitted event

            ↓ DATA LAYER: engagement events with session_id

[3] DECISION PHASE (Checkout funnel, 1-7 days before)
    ├─ Select Ticket Tier → begin_checkout event
    │  (Early Bird vs. Full Price vs. Student vs. Corporate)
    ├─ Enter Attendee Info → add_shipping_info + attendee_data
    ├─ Apply Promo Code → apply_coupon event
    ├─ Select Add-ons (Workshops, Merch) → add_to_cart event
    ├─ Enter Payment → add_payment_info event
    └─ Confirm Order → purchase event (GA4 recommended event)

        ↓ DATA LAYER: ecommerce events with custom attendee fields

[4] EVENT PHASE (3-day conference)
    ├─ Check-in at venue → event_checkin event
    │  (Badge data linked to GA tracking ID via QR code)
    ├─ View Session Guide → page_view (session details)
    ├─ Attend Session #1 → session_attended event
    ├─ Participate in Q&A → user_interacted event
    ├─ Visit Sponsor Booth → sponsor_booth_interaction event
    │  (Beacon tracking: 5+ min presence = engaged)
    ├─ Collect Business Cards → networking_interaction event
    └─ Rate Session → session_rated event

        ↓ DATA LAYER: real-time behavioral events (Firebase + Beacons)

[5] POST-EVENT PHASE (30-90 days after)
    ├─ View Event Recap → article_engage event
    ├─ Download Presentation Slides → file_download event
    ├─ Watch Session Recordings → video_engaged event
    ├─ Sign Up for Consultation → conversion_achieved event
    ├─ Complete Post-Event Survey → form_submitted event
    └─ Register for Next Year → goal_conversion event

        ↓ DATA LAYER: delayed conversion events + CRM sync

┌─────────────────────────────────────────────────────────────────┐
│                 GTM CONTAINER ARCHITECTURE (30+ TAGS)            │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Data Collection │  (Client-side + Server-side)
│  Layer (Browser) │
└────────┬─────────┘
         │
         ├─ window.dataLayer object
         ├─ Firebase SDK (real-time events)
         ├─ QR code scanner (beacon tracking)
         └─ UTM parameters (campaign attribution)

         ↓

┌──────────────────────────────────────────┐
│  Google Tag Manager Container            │
│  (GTM-XXXXXXXX)                          │
│                                          │
│  Variables (15+):                        │
│  ├─ {{ DataLayer - event }}              │
│  ├─ {{ DataLayer - user.id }}            │
│  ├─ {{ DataLayer - attendee.ticket_id }} │
│  ├─ {{ DataLayer - ecommerce.value }}    │
│  ├─ {{ URL - source }}                   │
│  └─ {{ Custom JS - beacon_duration }}    │
│                                          │
│  Triggers (12+):                         │
│  ├─ All pageviews                        │
│  ├─ Click - "Add to Cart" button         │
│  ├─ Form submission - Email signup      │
│  ├─ Form submission - Session selection  │
│  ├─ Scroll - 50% page depth              │
│  ├─ Custom event - session_attended      │
│  └─ Custom event - sponsor_interaction   │
│                                          │
│  Tags (30+):                             │
│  ├─ GA4 Configuration Tag (All pages)    │
│  ├─ GA4 Purchase Event Tag                 │
│  ├─ GA4 Engagement Event Tags (15+)      │
│  ├─ Google Ads Conversion Tags (3)       │
│  ├─ Facebook Pixel (lead gen)            │
│  ├─ LinkedIn Insight Tag                 │
│  ├─ HubSpot Lead Tracking                │
│  ├─ Hotjar Session Recording             │
│  ├─ Server-Side GTM Tag                  │
│  └─ Custom webhooks (CRM sync)           │
└────────┬─────────────────────────────────┘
         │
         ├─ Client-Side Destinations
         │  ├─ Google Analytics 4 (GA4)
         │  ├─ Google Ads (Conversion API)
         │  ├─ Facebook Ads Manager
         │  ├─ LinkedIn Campaign Manager
         │  └─ Hotjar
         │
         └─ Server-Side Destinations
            ├─ Google Cloud Events (BigQuery)
            ├─ CRM System (HubSpot/Salesforce)
            ├─ Email Platform (Klaviyo)
            ├─ Data Warehouse (internal)
            └─ Sponsor Dashboard (real-time)

┌─────────────────────────────────────────────────────────────────┐
│               DATA FLOW: REAL-TIME ATTENDEE JOURNEY              │
└─────────────────────────────────────────────────────────────────┘

USER ACTION ON SITE
    ↓
window.dataLayer.push({...})  ← JavaScript pushes event
    ↓
GTM collects event + context
    ↓
Variables extract data (user.id, ticket_id, etc.)
    ↓
Triggers evaluate conditions
    ↓
Matching Tags fire (GA4, Ads, FB Pixel, etc.)
    ↓
    ├─ GA4 receives: event name + 20 custom parameters
    ├─ Ads receives: conversion value + campaign source
    ├─ Server-Side GTM: routes high-value events (purchases)
    │  to CRM via API (latency: 50-200ms)
    └─ Real-time Dashboard: Shows live attendee engagement heat map

```

---

## Complete Data Layer Structure

### 1. Page View Events (Awareness Phase)

```javascript
// TICKET LISTING PAGE
window.dataLayer.push({
  'event': 'page_view',
  'page': {
    'title': 'Service Design Conference 2026 - Register',
    'path': '/tickets',
    'location': 'https://conference.example.com/tickets'
  },
  'referrer': {
    'source': 'google',
    'medium': 'organic',
    'campaign': 'brand-conference'
  },
  'user': {
    'logged_in': false,
    'previous_attendee': false
  },
  'timestamp': '2026-02-15T14:32:00Z'
});

// SESSION SCHEDULE PAGE
window.dataLayer.push({
  'event': 'page_view',
  'page': {
    'title': 'Session Schedule',
    'path': '/schedule',
    'type': 'schedule-view'
  },
  'content': {
    'event_id': 'servicedesign2026',
    'total_sessions': 52,
    'tracks': ['UX Strategy', 'Service Innovation', 'Digital Transformation'],
    'event_dates': '2026-06-15 to 2026-06-17'
  }
});
```

### 2. Engagement Events (Consideration Phase)

```javascript
// SESSION VIEWED - Indicates interest in specific content
window.dataLayer.push({
  'event': 'session_viewed',
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design',
    'speaker_id': 'spk_0914',
    'speaker_name': 'Dr. Sarah Chen',
    'track': 'AI & Automation',
    'time_slot': 'June 15, 10:00 AM',
    'capacity': 300,
    'expected_demand': 'high'
  },
  'user_action': {
    'action_type': 'session_selected',
    'intent_score': 0.8  // ML model: engagement probability
  }
});

// PDF DOWNLOAD - Agenda or speaker information
window.dataLayer.push({
  'event': 'file_download',
  'file': {
    'name': 'conference_agenda_2026.pdf',
    'type': 'agenda',
    'file_size_mb': 2.4
  },
  'engagement_signal': 'high'  // Downloading agenda = strong purchase intent
});

// SCROLL DEPTH - Measuring session interest
window.dataLayer.push({
  'event': 'scroll_depth',
  'scroll': {
    'depth_percentage': 75,
    'page': '/schedule'
  },
  'engagement_level': 'high'
});

// BLOG POST ENGAGEMENT - Content marketing
window.dataLayer.push({
  'event': 'article_engaged',
  'content': {
    'article_id': 'blog_0847',
    'article_title': '5 Service Design Trends for 2026',
    'time_on_page': 247,  // seconds
    'sections_read': 3,
    'shares': 1
  }
});
```

### 3. Form Events (Consideration → Decision)

```javascript
// EMAIL SIGNUP - Build marketing list
window.dataLayer.push({
  'event': 'form_submitted',
  'form': {
    'form_id': 'newsletter_signup',
    'form_name': 'Conference Newsletter',
    'form_location': 'homepage_hero',
    'fields_completed': 2  // email + name
  },
  'user': {
    'email': 'user@example.com',
    'company': 'Acme Design Inc',
    'role': 'UX Lead'
  }
});

// SESSION WISHLIST - Indicates purchase likelihood
window.dataLayer.push({
  'event': 'form_submitted',
  'form': {
    'form_id': 'session_wishlist_save',
    'action': 'save_sessions_to_profile'
  },
  'content': {
    'sessions_saved': 8,
    'track_distribution': {
      'UX Strategy': 3,
      'AI & Automation': 3,
      'Service Innovation': 2
    }
  },
  'user': {
    'creation_date': '2026-02-01',  // First touchpoint
    'engagement_score': 6.5  // Out of 10
  }
});
```

### 4. E-Commerce Events (Decision Phase - Checkout Funnel)

```javascript
// BEGIN CHECKOUT (Ticket selection)
window.dataLayer.push({
  'event': 'begin_checkout',
  'ecommerce': {
    'currency': 'USD',
    'items': [{
      'item_id': 'ticket_full_conference',
      'item_name': 'Full Conference Pass - Early Bird',
      'affiliation': 'servicedesign2026',
      'price': 799.00,
      'quantity': 1,
      'item_category': 'Event Ticket'
    }]
  },
  'ticket': {
    'tier': 'early_bird',
    'original_price': 1099.00,
    'discount_amount': 300.00,
    'discount_code': 'EARLYBIRD2026'
  },
  'user': {
    'user_id': 'user_547821',
    'email': 'designer@company.com',
    'previous_attendee': true
  }
});

// APPLY COUPON
window.dataLayer.push({
  'event': 'apply_coupon',
  'ecommerce': {
    'coupon': 'EARLYBIRD2026',
    'currency': 'USD',
    'value': 300.00,  // Discount amount
    'items': [{
      'item_id': 'ticket_full_conference',
      'item_name': 'Full Conference Pass',
      'price': 799.00
    }]
  },
  'coupon_details': {
    'coupon_type': 'early_bird`,
    'coupon_source': 'email_campaign_seq3',
    'expiration_date': '2026-03-15'
  }
});

// ADD ADDON (Workshops, merchandise)
window.dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {
    'currency': 'USD',
    'value': 349.00,
    'items': [
      {
        'item_id': 'ticket_full_conference',
        'item_name': 'Full Conference Pass',
        'price': 799.00,
        'quantity': 1
      },
      {
        'item_id': 'workshop_serviceblueprint',
        'item_name': '2-Hour Workshop: Service Blueprinting Mastery',
        'price': 199.00,
        'quantity': 1,
        'parent_session_id': 'workshop_sb_001'
      },
      {
        'item_id': 'merchandise_tshirt',
        'item_name': 'Conference T-Shirt (L)',
        'price': 29.00,
        'quantity': 1
      }
    ]
  },
  'cart': {
    'total_items': 3,
    'total_value': 1027.00
  }
});

// SHIPPING/ATTENDEE INFO (Digital event - ticket delivery method)
window.dataLayer.push({
  'event': 'add_shipping_info',
  'ecommerce': {
    'shipping_tier': 'email_delivery',
    'currency': 'USD'
  },
  'attendee': {
    'first_name': 'Alice',
    'last_name': 'Johnson',
    'email': 'alice@company.com',
    'company': 'Tech Design Studio',
    'job_title': 'Senior UX Manager',
    'country': 'United States',
    'state': 'California',
    'industry': 'Technology',
    'company_size': '100-500'
  }
});

// PAYMENT INFO
window.dataLayer.push({
  'event': 'add_payment_info',
  'ecommerce': {
    'currency': 'USD',
    'payment_type': 'credit_card',
    'items': [{
      'item_id': 'ticket_full_conference',
      'item_name': 'Full Conference Pass',
      'quantity': 1
    }]
  },
  'payment': {
    'payment_method': 'visa',
    'processor': 'stripe'
  },
  'funnel_step': 3  // Of 5 total steps
});

// PURCHASE (Main conversion event)
window.dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'order_8471923',
    'value': 1027.00,
    'currency': 'USD',
    'items': [
      {
        'item_id': 'ticket_full_conference',
        'item_name': 'Full Conference Pass - Early Bird',
        'affiliation': 'servicedesign2026',
        'price': 799.00,
        'quantity': 1,
        'item_category': 'Event Ticket',
        'ticket_tier': 'early_bird'
      },
      {
        'item_id': 'workshop_serviceblueprint',
        'item_name': '2-Hour Workshop: Service Blueprinting',
        'price': 199.00,
        'quantity': 1,
        'item_category': 'Workshop'
      },
      {
        'item_id': 'merchandise_tshirt',
        'item_name': 'Conference T-Shirt',
        'price': 29.00,
        'quantity': 1,
        'item_category': 'Merchandise'
      }
    ]
  },
  'order': {
    'order_id': 'order_8471923',
    'order_source': 'website',
    'discount_code': 'EARLYBIRD2026',
    'discount_amount': 300.00,
    'final_price': 1027.00,
    'payment_status': 'completed'
  },
  'user': {
    'user_id': 'user_547821',
    'email': 'alice@company.com',
    'previous_attendee': true,
    'years_attending': 2,
    'loyalty_tier': 'repeat_attendee'
  },
  'attribution': {
    'initial_source': 'email',
    'initial_medium': 'email_campaign',
    'initial_campaign': 'earlybird_launch',
    'final_touch_source': 'organic',
    'final_touch_medium': 'direct'
  }
});
```

### 5. Event Phase Events (Real-Time Tracking)

```javascript
// BADGE CHECK-IN (QR code scanned at registration desk)
window.dataLayer.push({
  'event': 'event_checkin',
  'checkin': {
    'checkin_id': 'checkin_847293',
    'timestamp': '2026-06-15T09:15:00Z',
    'location': 'Main Registration Hall',
    'badge_id': 'badge_0547821'
  },
  'attendee': {
    'user_id': 'user_547821',
    'email': 'alice@company.com',
    'ticket_tier': 'early_bird',
    'first_time_attendee': false
  },
  'event_session': {
    'event_id': 'servicedesign2026',
    'event_date': '2026-06-15'
  }
});

// SESSION ATTENDANCE (Beacon/RFID triggered)
window.dataLayer.push({
  'event': 'session_attended',
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design',
    'speaker_id': 'spk_0914',
    'speaker_name': 'Dr. Sarah Chen',
    'track': 'AI & Automation',
    'time_slot': 'June 15, 10:00 AM',
    'session_duration_minutes': 60,
    'capacity': 300,
    'actual_attendance': 247
  },
  'attendance': {
    'arrival_time': '2026-06-15T09:55:00Z',
    'departure_time': '2026-06-15T11:05:00Z',
    'duration_attended_minutes': 70,
    'device_beacon_id': 'beacon_0547821'
  }
});

// SESSION RATING (Post-session mobile app)
window.dataLayer.push({
  'event': 'session_rated',
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design',
    'rating': 5,  // 1-5 stars
    'rating_scale': 5
  },
  'feedback': {
    'like_most': 'Practical examples and local case studies',
    'improve': 'More time for Q&A',
    'recommend_speaker': true
  },
  'user': {
    'user_id': 'user_547821'
  }
});

// SPONSOR BOOTH INTERACTION (Beacon duration tracking)
window.dataLayer.push({
  'event': 'sponsor_booth_interaction',
  'sponsor': {
    'sponsor_id': 'sponsor_acme_design',
    'sponsor_name': 'Acme Design Tools Inc',
    'booth_location': 'Expo Hall - Booth A12',
    'sponsorship_tier': 'platinum'
  },
  'interaction': {
    'interaction_duration_minutes': 12,
    'interaction_type': 'booth_visit',
    'engagement_level': 'high',  // 5+ min = high
    'contact_captured': true,
    'lead_id': 'lead_847293_acmedesign'
  },
  'lead_details': {
    'lead_email': 'alice@company.com',
    'lead_phone': '+1-555-0123',
    'lead_company': 'Tech Design Studio',
    'lead_job_title': 'Senior UX Manager',
    'product_interest': 'Design Systems & Component Libs'
  }
});

// Q&A PARTICIPATION (Real-time during session)
window.dataLayer.push({
  'event': 'user_interacted',
  'interaction': {
    'interaction_type': 'qa_submission',
    'format': 'live_q&a'
  },
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design',
    'question_text': 'How do you ensure AI-generated designs maintain human-centered principles?',
    'question_upvotes': 8
  },
  'user': {
    'user_id': 'user_547821',
    'participation_score': 1  // Incrementing engagement metric
  }
});

// NETWORKING (Scanned QR codes or exchanged contact info)
window.dataLayer.push({
  'event': 'networking_interaction',
  'interaction': {
    'interaction_id': 'network_847293_0912',
    'interaction_type': 'contact_exchange',
    'timestamp': '2026-06-15T15:30:00Z'
  },
  'contacts': {
    'user_a_id': 'user_547821',
    'user_b_id': 'user_664902',
    'user_b_email': 'bob@designfirm.com',
    'user_b_company': 'Design Firm Co'
  }
});

// MERCHANDISE PURCHASE AT BOOTH
window.dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'order_8471924_booth',
    'value': 75.00,
    'currency': 'USD',
    'items': [
      {
        'item_id': 'merchandise_hoodie',
        'item_name': 'Conference Hoodie (XXL)',
        'price': 49.00,
        'quantity': 1,
        'item_category': 'Merchandise'
      },
      {
        'item_id': 'merchandise_notebook',
        'item_name': 'Design Thinking Workbook',
        'price': 26.00,
        'quantity': 1,
        'item_category': 'Merchandise'
      }
    ]
  },
  'purchase_context': {
    'purchase_location': 'booth',
    'purchase_method': 'credit_card_at_booth'
  }
});
```

### 6. Post-Event Engagement Events

```javascript
// VIDEO WATCHED (Session recording)
window.dataLayer.push({
  'event': 'video_engaged',
  'video': {
    'video_id': 'rec_12847_full',
    'video_title': 'The Future of AI in Service Design - Full Recording',
    'video_duration_seconds': 3660,
    'content_type': 'session_recording',
    'speaker_name': 'Dr. Sarah Chen',
    'track': 'AI & Automation'
  },
  'engagement': {
    'time_watched_seconds': 2845,
    'completion_rate': 0.78,  // 78% watched
    'paused_count': 3,
    'playback_speed': 1.0
  },
  'user': {
    'user_id': 'user_547821',
    'attendee_status': 'attended_live'  // Also watched live
  }
});

// PRESENTATION DOWNLOAD (Post-event collateral)
window.dataLayer.push({
  'event': 'file_download',
  'file': {
    'file_id': 'slides_12847_chen_ai',
    'file_name': 'The Future of AI in Service Design - Slides.pdf',
    'file_type': 'presentation',
    'file_size_mb': 8.4,
    'download_source': 'post_event_portal'
  },
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design',
    'speaker_name': 'Dr. Sarah Chen'
  },
  'user': {
    'days_after_event': 3
  }
});

// CONSULTATION BOOKING (Goal conversion)
window.dataLayer.push({
  'event': 'conversion_achieved',
  'conversion': {
    'conversion_id': 'conv_847293_consult01',
    'conversion_type': 'consultation_booked',
    'conversion_value': 2500.00,  // Estimated contract value
    'conversion_probability': 0.65  // 65% chance to close
  },
  'booking': {
    'consultation_type': 'service_design_strategy',
    'duration_hours': 2,
    'consultation_date': '2026-07-10',
    'company': 'Tech Design Studio'
  },
  'source': {
    'source_session': 'sess_12847',
    'source_speaker': 'Dr. Sarah Chen',
    'source_track': 'AI & Automation'
  },
  'user': {
    'user_id': 'user_547821',
    'email': 'alice@company.com',
    'engagement_score': 8.5  // High engagement post-event
  }
});

// POST-EVENT SURVEY (Feedback collection)
window.dataLayer.push({
  'event': 'form_submitted',
  'form': {
    'form_id': 'post_event_survey_2026',
    'form_name': 'Conference Feedback Survey',
    'completion_time_seconds': 487
  },
  'survey_data': {
    'overall_satisfaction': 4.5,  // 1-5 scale
    'likelihood_to_attend_next_year': 5,  // 1-5 scale
    'sessions_attended': 8,
    'sessions_would_take_again': ['sess_12847', 'sess_09182', 'sess_04756'],
    'most_valuable_aspect': 'Networking opportunities',
    'least_valuable_aspect': 'Venue walk distance'
  },
  'recommendations': {
    'recommend_conference_to_colleague': true,
    'interested_in_speaking': true,
    'interested_in_sponsoring': false
  }
});

// RE-ENGAGEMENT (Email click 30 days post-event)
window.dataLayer.push({
  'event': 'user_engagement',
  'engagement': {
    'engagement_type': 'email_click',
    'email_campaign_id': 'email_recap_30day',
    'email_link': '/next-year-early-bird',
    'days_after_event': 30
  },
  'content': {
    'email_subject': 'Secure your spot for Service Design Conference 2027',
    'link_text': 'Claim your 30% Early Bird Discount'
  },
  'user': {
    'user_id': 'user_547821',
    'previous_attendee': true,
    'purchase_status': 'purchased_previous_year'
  }
});

// NEXT YEAR REGISTRATION (Goal: Repeat Attendee)
window.dataLayer.push({
  'event': 'goal_conversion',
  'goal': {
    'goal_id': 'goal_2027_registration',
    'goal_name': 'Next Year Conference Registration',
    'goal_type': 'repeat_attendance'
  },
  'user': {
    'user_id': 'user_547821',
    'cohort': 'repeat_attendee',
    'repeat_count': 3,  // 3rd time attending
    'ltv_to_date': 2754.00,  // Lifetime ticket value
    'average_additional_spend': 156.00
  },
  'registration': {
    'ticket_tier': 'full_conference',
    'purchase_date': '2026-03-01',
    'days_since_last_event': 365
  }
});
```

---

## GA4 Events Mapping & Configuration

### Recommended GA4 Events vs. Custom Events

| GA4 Recommended Event | Conference Context | Data Parameters | Priority |
|---|---|---|---|
| `page_view` | All page loads (tickets, schedule, etc.) | page_title, page_location, page_path | 🔴 Critical |
| `view_item` | Session viewed | item_id, item_name, item_category | 🔴 Critical |
| `view_item_list` | Schedule/all sessions | items (array), item_category | 🔴 Critical |
| `begin_checkout` | Ticket tier selected | items, value, currency | 🔴 Critical |
| `add_payment_info` | Payment method entered | payment_type | 🟠 High |
| `purchase` | order completed | transaction_id, value, currency, items | 🔴 Critical |
| `add_to_cart` | Workshop/addon added | item_id, item_name, value | 🟠 High |
| `form_start` | Form focused (email signup) | form_id, form_name | 🟡 Medium |
| `form_submit` | Email/wishlist submitted | form_id, form_name | 🟠 High |
| `scroll` | Content engagement | scroll_depth_threshold | 🟡 Medium |
| `search` | Session search | search_term | 🟡 Medium |

| Custom Event | Conference Context | Why Custom | Example Data |
|---|---|---|---|
| `session_viewed` | Speaker/session page viewed | Highly specific to events | session_id, speaker_name, track |
| `session_attended` | Beacon detected at session | Venue attendance tracking | session_id, arrival_time, duration |
| `session_rated` | User rates session (1-5 stars) | Post-session feedback | session_id, rating, comment |
| `sponsor_booth_interaction` | Booth visit + duration | Sponsor ROI tracking | sponsor_name, duration_minutes |
| `event_checkin` | Badge scanned at venue | Attendance verification | badge_id, location, timestamp |
| `networking_interaction` | Contact exchange | Network quality metric | contact_a_id, contact_b_id |
| `user_interacted` | Q&A, polls, chat | Real-time engagement | interaction_type, content_id |
| `conversion_achieved` | Follow-up consulting booked | Post-event business result | conversion_id, conversion_value |

### GA4 Conversion Goals

Configured in GA4 Console:

```
CONVERSION 1: Purchase
├─ Event Name: purchase
├─ Trigger: purchase event fires
└─ Business Impact: $800-$1,500 per conversion

CONVERSION 2: High-Value Lead (Sponsor Booth Engaged 5+ min)
├─ Event Name: sponsor_booth_interaction
├─ Conditions: duration_minutes >= 5 AND contact_captured = true
└─ Business Impact: $3,000-$15,000 per conversion

CONVERSION 3: Consultation Booked
├─ Event Name: conversion_achieved
├─ Conditions: conversion_type = consultation_booked
└─ Business Impact: $2,500-$50,000+ per conversion

CONVERSION 4: Email List Signup
├─ Event Name: form_submit
├─ Conditions: form_id = newsletter_signup
└─ Business Impact: 30% newsletter-to-registration rate

CONVERSION 5: Session Wishlist (Purchase Intent Indicator)
├─ Event Name: form_submit
├─ Conditions: form_id = session_wishlist_save AND sessions_saved >= 5
└─ Business Impact: 65% conversion rate for wishlist users
```

---

## 5 Day-1 Tasks & Tickets

### TICKET 1: GA4 Implementation Audit & Data Quality Validation
**Priority**: 🔴 CRITICAL | **Time**: 4-5 hours | **Launch**: Day 1, 8:00 AM

**Objective**: Verify GA4 is properly receiving all conference tracking events before public launch.

**Context**:
- Conference website launches in 3 days
- Early bird sales window is critical (45% of revenue)
- Any data loss during launch will skew attribution reports

**Tasks**:

1. **GA4 Events Reality Check** (45 min)
   ```
   - Access GA4 Real-time Events Report
   - Verify these events are appearing:
     ✓ page_view (all pages)
     ✓ view_item (session pages)
     ✓ begin_checkout (ticket selection)
     ✓ purchase (completed orders)
     ✓ form_submit (email signup)
   
   - Check event counts: At least 100+ events in testing
   - Expected volume: 500+ daily by end of week
   ```

2. **Data Validation** (90 min)
   ```
   Document Parameter Quality:
   
   ✓ Purchase Events MUST have:
     - ecommerce.transaction_id (unique identifier)
     - ecommerce.value (ticket price)
     - ecommerce.currency (USD)
     - user_id (attendee tracking)
   
   ✓ Session Events MUST have:
     - content.session_id (unique per session)
     - content.session_title (human readable)
     - content.track (category)
   
   Audit: Run GA4 DebugView for 10 test purchases
   Success: All parameters populated, no null values
   ```

3. **Funnel Completeness** (60 min)
   ```
   Test Full Checkout Flow:
   
   page_view → view_item (session) → view_item (ticket page) 
       → begin_checkout → add_payment_info → purchase
   
   Verify: GA4 Funnel Analysis shows all steps
   Expected: 100% step completion in testing
   
   Common Issues to Check:
   - purchase event firing AFTER thank-you page load
   - ecommerce.items array is populated
   - User IDs persist across sessions
   ```

4. **Custom Events Verification** (75 min)
   ```
   Check these are implemented (even if no test data yet):
   
   ✓ session_viewed (trigger: session page load)
   ✓ session_attended (trigger: beacon detection)
   ✓ sponsor_booth_interaction (trigger: booth visit)
   ✓ form_submit (trigger: email signup)
   
   For each:
   - Verify in GTM Tag Manager
   - Confirm dataLayer.push code is present
   - Check trigger conditions
   ```

**Expected Outcome**:
- ✅ All GA4 events firing correctly
- ✅ Data quality checklist signed off
- ✅ Known issues documented in JIRA
- ✅ Ready for public launch

**If Issues Found**:
```
Issue 1: Purchase events missing ecommerce.value
├─ Root Cause: Server not populating pricing data
├─ Fix: Update dataLayer.push code on order page
└─ Time to Fix: 1-2 hours

Issue 2: Custom events not appearing
├─ Root Cause: GTM tags not published
├─ Fix: Review GTM triggers, test in preview mode, publish
└─ Time to Fix: 30 minutes

Issue 3: User IDs not persisting
├─ Root Cause: New session = new user_id assigned
├─ Fix: Implement cross-domain user ID in GTM variables
└─ Time to Fix: 2-3 hours
```

---

### TICKET 2: Server-Side GTM Setup & Privacy Compliance
**Priority**: 🔴 CRITICAL | **Time**: 6-8 hours | **Launch**: Day 2

**Objective**: Deploy server-side GTM to ensure GDPR/CCPA compliance and prevent iOS ITP data loss.

**Business Context**:
- 35% of attendees will be on iOS devices
- Without server-side GTM: lose 30-40% of iOS conversion tracking
- Estimated revenue loss: $225K-$300K annually
- Legal requirement for GDPR consent compliance

**Architecture**:
```
┌─ Attendee Clicks "Register" on iPhone
│
├─ Browser sends event to:
│  yourconference.com/gtag  ← YOUR domain (first-party cookie!)
│
├─ Server-side GTM runs on Cloudflare Workers
│
├─ Receives:
│  - Ticket purchase event
│  - Attendee email
│  - Payment amount
│
└─ Forwards to:
   ├─ Google Analytics 4
   ├─ Google Ads (Conversion API)
   ├─ HubSpot CRM
   └─ Email platform (Klaviyo)
   
Result: First-party cookie persists 13 months (vs. 7 days)
```

**Tasks**:

1. **Cloudflare Workers Setup** (90 min)
   ```javascript
   // Create file: /api/cloudflare/src/index.js
   
   export default {
     async fetch(request, env, ctx) {
       // Parse incoming GTM event from browser
       const body = await request.json();
       const { event, ecommerce, user } = body;
       
       // Log for debugging
       console.log(`Received ${event} event from ${user.email}`);
       
       // Only process high-value events
       if (event === 'purchase') {
         // Forward to Google Analytics 4
         await forwardToGA4(ecommerce, env.GA4_API_SECRET);
         
         // Forward to Google Ads Conversion API
         await forwardToGoogleAds(ecommerce, env.GOOGLE_ADS_KEY);
         
         // Add to HubSpot for CRM
         await addToHubSpot(user, ecommerce, env.HUBSPOT_API_KEY);
       }
       
       return new Response(JSON.stringify({status: 'ok'}));
     }
   };
   
   async function forwardToGA4(ecommerce, apiSecret) {
     const ga4Payload = {
       api_secret: apiSecret,
       events: [{
         name: 'purchase',
         params: {
           transaction_id: ecommerce.transaction_id,
           value: ecommerce.value,
           currency: ecommerce.currency
         }
       }]
     };
     
     await fetch('https://www.google-analytics.com/mp/collect', {
       method: 'POST',
       body: JSON.stringify(ga4Payload)
     });
   }
   ```

2. **GTM Server-Side Container** (120 min)
   ```
   In GTM Console:
   
   ✓ Create new Server-Side Container
     - Name: "Conference Server-Side Tracking"
     - Region: US (or your primary region)
   
   ✓ Add Client (HTTP source)
     - Named: "Browser Events"
     - Source: Configure to accept POST from yourconference.com/gtag
   
   ✓ Add Destinations:
     1. GA4 Destination (Google Measurement Protocol)
     2. Google Ads Destination (Conversion API)
     3. Custom Webhook (HubSpot CRM)
   
   ✓ Add Routes:
     - If event.name = "purchase" → send to all destinations
     - If event.name = "view_item" → send to GA4 only (data saving)
   
   ✓ Deploy Server Container
   ```

3. **Browser Integration** (90 min)
   ```javascript
   // Modify existing page tracking:
   
   // OLD (Client-side only):
   window.dataLayer.push({
     event: 'purchase',
     ecommerce: { ... }
   });
   
   // NEW (Client-side GA4 + Server-side forwarder):
   window.dataLayer.push({
     event: 'purchase',
     ecommerce: {
       transaction_id: 'order_8471923',
       value: 1027.00,
       currency: 'USD'
     }
   });
   
   // Also send to server-side GTM
   fetch('/gtag/collect', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       event: 'purchase',
       ecommerce: {
         transaction_id: 'order_8471923',
         value: 1027.00,
         currency: 'USD'
       },
       user: {
         email: 'alice@company.com',
         user_id: 'user_547821'
       }
     })
   });
   ```

4. **GDPR Consent Banner Integration** (60 min)
   ```javascript
   // Only send events after user consents
   
   // Fire this after consent acceptance:
   window.dataLayer.push({
     'event': 'gtag.config',
     'anonymizeIP': false,
     'configUpdate': true
   });
   
   // Then allow:
   window.dataLayer.push({
     event: 'purchase',
     ecommerce: { ... }  // Now tracked
   });
   ```

**Expected Outcome**:
- ✅ Server-side GTM deployed and working
- ✅ iOS conversion tracking recovery: +30-40% data
- ✅ First-party cookies set (13-month lifespan)
- ✅ GDPR compliance verified
- ✅ Business Impact: $225K revenue recovery

**Validation Checklist**:
```
□ Test purchase event reaches GA4 (latency < 5 sec)
□ Test iOS conversion tracking (simulate iOS)
□ Test HubSpot CRM receives purchase data
□ Verify GDPR consent toggle works
□ Monitor error logs (< 1% error rate)
□ Load test: 1000 events/minute (capacity planning)
```

---

### TICKET 3: Cart Abandonment Tracking & Recovery Implementation
**Priority**: 🟠 HIGH | **Time**: 3-4 hours | **Launch**: Day 3

**Objective**: Implement cart abandonment tracking to enable email recovery campaigns.

**Business Context**:
- Projected: 2,500 abandoned carts during early bird window
- Typical recovery rate: 40% (recover $1M in revenue)
- Email 1 sent immediately: 22% recovery rate
- Email 2 sent 24hr later: 15% recovery rate
- Email 3 sent 48hr later: 3% recovery rate

**Tasks**:

1. **Implement Cart Tracking** (45 min)
   ```javascript
   // When user adds ticket to cart but doesn't checkout
   
   window.dataLayer.push({
     'event': 'add_to_cart',
     'ecommerce': {
       'currency': 'USD',
       'value': 799.00,
       'items': [{
         'item_id': 'ticket_full_conference',
         'item_name': 'Full Conference Pass - Early Bird',
         'price': 799.00,
         'quantity': 1,
         'item_category': 'Event Ticket'
       }]
     },
     'user': {
       'email': 'alice@company.com',
       'user_id': 'user_547821'
     },
     'cart_session': {
       'cart_id': 'cart_847293_sess1',
       'cart_creation_time': '2026-02-15T14:32:00Z'
     }
   });
   
   // Store cart ID locally for identification
   localStorage.setItem('current_cart_id', 'cart_847293_sess1');
   localStorage.setItem('cart_items', JSON.stringify([...]));
   localStorage.setItem('cart_total', '799.00');
   ```

2. **Abandon Detection** (45 min)
   ```
   Implementation: Server-side logic
   
   Trigger: 15 minutes pass after add_to_cart, NO purchase event
   
   Action 1 (Immediate):
   └─ Send "Abandoned Cart" event to CRM with 15-min timestamp
   
   Action 2 (Email 1: 5 min after abandon):
   └─ Emails: "You left something behind - $5 off code inside"
             30-min limited validity
   
   Action 3 (Email 2: 24 hours later):
   └─ If still abandoned: "Only 24 hours left for Early Bird"
   
   Action 4 (Email 3: 48 hours later):
   └─ If still abandoned: "Last chance - Early Bird expires in 2 hours"
     └─ Include 24-hour access to past days' sessions
   
   Success Metric: Track which email drives recovery
   ```

3. **GA4 Configuration** (30 min)
   ```
   In GA4 Console:
   
   ✓ Create Conversion: "Cart Abandon"
     - Event: add_to_cart
     - Condition: event_count NOT FOLLOWED BY purchase within 15 min
   
   ✓ Create Report: "Top Abandoned Items"
     - Rows: item_name, item_category
     - Values: add_to_cart count, conversion rate
   
   ✓ Create Segment: "Cart Abandoners"
     - Include: add_to_cart event
     - Exclude: purchase event (within 24 hours)
   ```

4. **Data Validation** (15 min)
   ```
   Test flow:
   1. Add ticket to cart → Verify add_to_cart event in GA4
   2. Wait 15 minutes
   3. Check: "Cart Abandoned" conversion triggered
   4. Verify email sent from CRM
   
   Expected Results:
   - add_to_cart event appears in GA4 within 2 sec
   - Abandoned cart email sent within 5 min
   - Email contains correct cart total + promo code
   ```

**Expected Outcome**:
- ✅ Track abandoned carts in GA4
- ✅ CRM receives abandonment data
- ✅ Automated recovery email sequence ready
- ✅ Business Impact: Recover $1M in early bird revenue

---

### TICKET 4: Multi-Touch Attribution Model Implementation
**Priority**: 🟠 HIGH | **Time**: 5-6 hours | **Launch**: Day 4

**Objective**: Configure GA4 attribution model to understand true ROI of marketing channels.

**Business Context**:
Last-click attribution shows: Email = 60% of conversions (Doesn't tell full story!)

Truth (with multi-touch attribution):
- Email is FINAL touch: 60%
- But LinkedIn Ads were FIRST touch: 70% of all conversions
- Organic search was MIDDLE touch: 45% of all conversions

Budget implication: Under-funding LinkedIn (which creates awareness) and overfunding email (which just closes)

**Tasks**:

1. **Attribution Models Configuration** (90 min)
   ```
   In GA4 Console → Administration → Attribution Settings
   
   Model 1: Last Click (Default - for control)
   Model 2: First Click (Awareness importance)
   Model 3: Linear (Equal credit to all touches)
   Model 4: Time Decay (Recent touches weight more)
   Model 5: Position-Based (40% first, 40% last, 20% middle)
   Model 6: Data-Driven (GA4 ML model - if you have 10K conversions)
   
   Conversion Window: 30 days (for conference purchasing cycle)
   ```

2. **Attribution Report Setup** (90 min)
   ```javascript
   Create Custom Reports in GA4:
   
   Report 1: "First Touch Attribution"
   ├─ Dimensions: 
   │  └─ First user source + medium (e.g., "google/organic")
   ├─ Metrics:
   │  └─ Purchases, Revenue
   └─ Insight: Which channels START the buyer journey?
   
   Report 2: "Last Touch Attribution"
   ├─ Dimensions:
   │  └─ Last session source + medium
   ├─ Metrics:
   │  └─ Purchases, Revenue
   └─ Insight: Which channels CLOSE the sale?
   
   Report 3: "Cross-Channel Path"
   ├─ Dimensions:
   │  └─ Session source path (e.g., "linkedin → email → organic")
   ├─ Filters:
   │  └─ Event: purchase
   ├─ Metrics:
   │  └─ Count of paths, Average revenue per path
   └─ Insight: Which sequences convert best?
   
   Report 4: "Budget Allocation Optimization"
   ├─ Calculation:
   │  └─ (First touch revenue rate) / (Current ad spend)
   ├─ Result:
   │  └─ ROI by channel tells where to increase budget
   ```

3. **Marketing Mix Implications** (90 min)
   ```
   Data Analysis (Hypothetical):
   
   CURRENT SPEND vs. LAST-CLICK ATTRIBUTION:
   Channel         Budget    Conversions    Last-Click ROI
   ─────────────────────────────────────────────────────────
   Email           $50K      1,200          $41.67 per purchase
   LinkedIn Ads    $75K      800            $93.75 per purchase
   Google Ads      $100K     1,000          $100 per purchase
   Organic         $0        600            ?? (can't spend more)
   Facebook        $40K      200            $200 per purchase
   
   
   TRUE VALUE (WITH MULTI-TOUCH ATTRIBUTION):
   Channel         First Touch    Middle Touch    Last Touch    Total Value
   ──────────────────────────────────────────────────────────────────────────
   Email           15%            20%             60%           95% of total
   LinkedIn Ads    70%            30%             5%            105% of total
   Google Ads      60%            40%             20%           120% of total
   Organic         20%            35%             15%           70% of total
   Facebook        10%            5%              2%             17% of total
   
   
   RECOMMENDED BUDGET REALLOCATION:
   
   Email:      $50K → $40K  (-$10K, it converts but relies on awareness)
   LinkedIn:   $75K → $120K (+$45K, drives awareness which multiplies)
   Google:     $100K → maintain (high ROI at all stages)
   Facebook:   $40K → $20K  (-$20K, low overall impact)
   Organic:    $0 → $15K    (+$15K for content/SEO, feeds itself)
   
   Result: +$30K net, +$150K additional revenue
   ```

4. **Data-Driven Model Training** (60 min)
   ```
   IF you have 10,000+ conversions:
   
   Enable "Data-Driven Attribution" in GA4:
   - GA4 ML model learns true path-to-conversion patterns
   - Account for conversion likelihood at each step
   - Automatically reweight channels
   
   Process:
   1. Go to GA4 Admin → Attribution Settings
   2. Select "Data-Driven" model
   3. GA4 trains for 30 days (needs 10K+ conversions to stabilize)
   4. Compare to other models to debug
   
   Result: Most accurate picture of channel contribution
   ```

**Expected Outcome**:
- ✅ Attribution models configured in GA4
- ✅ Multi-touch reports created
- ✅ Marketing budget optimization identified (+$150K potential revenue)
- ✅ Data-driven budget reallocation recommended

---

### TICKET 5: Checkout Funnel Optimization & Bounce Rate Debug
**Priority**: 🟠 HIGH | **Time**: 4-5 hours | **Launch**: Day 5

**Objective**: Identify and fix what's causing 45% of ticket checkout attempts to fail.

**Business Context**:
- 3,000 people begin checkout per day (during early bird)
- 1,350 complete purchase (45% bounce rate)
- If fixed to 60% → Additional $450K in revenue
- Root causes: Form errors, payment failures, unclear copy, friction

**Tasks**:

1. **Checkout Funnel Analysis** (60 min)
   ```
   GA4 Funnel Report:
   
   Step 1: page_view (ticket page)
   └─ 3,000 users
   
   Step 2: begin_checkout (ticket selected)
   └─ 2,400 users (80% drop: -600)
      Issue: Likely didn't select ticket tier or saw price point
   
   Step 3: add_shipping_info (attendee details form)
   └─ 2,100 users (87.5% of step 2)
      Drop: -300 (12.5% - NORMAL friction)
   
   Step 4: add_payment_info (payment method entry)
   └─ 1,800 users (85.7% of step 3)
      Drop: -300 (14.3% - EXPECTED, payment hesitation)
   
   Step 5: purchase (order confirmation)
   └─ 1,350 users (75% of step 4)
      Drop: -450 (25% - CRITICAL, likely payment failure)
   
   
   ANALYSIS:
   - Step 1→2 loss (-600): Display price prominently on homepage
   - Step 2→3 loss: NORMAL
   - Step 3→4 loss: NORMAL
   - Step 4→5 loss (-450): CRITICAL - Payment processor issues
   ```

2. **Session Recordings Analysis** (90 min)
   ```
   Tool: Hotjar Session Recording
   
   Watch 20 sessions of users who abandoned at step 4→5:
   
   Pattern 1: "Payment button unresponsive"
   └─ Users click "Pay" but nothing happens
   └─ Root cause: Stripe integration timeout
   └─ Fix: Increase timeout from 3s to 8s
   
   Pattern 2: "The form has errors" (error message confusing)
   └─ Users entering wrong card, don't understand error
   └─ Root cause: Generic payment error message
   └─ Fix: Show specific error (e.g., "Expiration date is invalid")
   
   Pattern 3: "Where's the payment method selection?"
   └─ Users don't see option to select credit card or PayPal
   └─ Root cause: Payment method selector not visible on mobile
   └─ Fix: Move payment method selector above fold
   
   Pattern 4: "Is this secure? I don't see SSL badge"
   └─ Users hesitate, tab away, never return
   └─ Root cause: Trust indicators missing
   └─ Fix: Add "Powered by Stripe" / SSL badge
   
   Pattern 5: "Why is it asking for my company?"
   └─ Required field confuses personal attendees
   └─ Root cause: Form requires all B2B fields
   └─ Fix: Make "company" optional
   ```

3. **Technical Implementation** (90 min)
   ```python
   # Code changes needed:
   
   # 1. Payment field error messages (STRIPE)
   # OLD:
   "error": {
     "message": "Your card was declined"
   }
   
   # NEW:
   "error": {
     "message": "Your card's expiration date (MM/YY) is invalid. 
                 Please enter a valid date."
   }
   
   # 2. Payment button timeout
   # OLD:
   timeout: 3000  // milliseconds
   
   # NEW:
   timeout: 8000  // Give Stripe more time
   
   # 3. Company field (make optional)
   # OLD:
   <input name="company" required />
   
   # NEW:
   <input name="company" />  // No "required"
   
   # 4. Add trust signal
   # NEW:
   <div class="payment-security">
     <img src="/stripe-logo.svg" alt="Secured by Stripe" />
     <icon class="ssl-badge" />
     <p>Your payment is secure and encrypted</p>
   </div>
   
   # 5. Visible payment method selector
   # NEW:
   <div class="payment-methods" style="display: block;">
     <label>
       <input type="radio" value="card" checked /> 
       Credit Card
     </label>
     <label>
       <input type="radio" value="alipay" /> 
       Apple Pay
     </label>
     <label>
       <input type="radio" value="paypal" /> 
       PayPal
     </label>
   </div>
   ```

4. **GA4 Event Tracking for Debugging** (60 min)
   ```javascript
   // Add high-detail GA4 tracking for payment debugging
   
   // When payment button clicked:
   window.dataLayer.push({
     'event': 'payment_initiated',
     'payment': {
       'payment_processor': 'stripe',
       'payment_method': 'card',
       'order_value': 1027.00
     }
   });
   
   // If payment fails:
   window.dataLayer.push({
     'event': 'payment_failed',
     'error': {
       'error_code': 'card_declined',
       'error_message': 'Your card was declined',
       'payment_processor': 'stripe',
       'retry_attempt': 1
     }
   });
   
   // If payment succeeds:
   window.dataLayer.push({
     'event': 'purchase',
     'ecommerce': {
       'transaction_id': 'order_8471923',
       'value': 1027.00,
       'currency': 'USD'
     },
     'payment': {
       'time_to_completion_seconds': 3.5
     }
   });
   ```

**Expected Outcome**:
- ✅ Funnel drop-off points identified
- ✅ Root causes understood (technical + UX)
- ✅ Fixes implemented and tested
- ✅ Bounce rate improved: 45% → 60%
- ✅ Business Impact: +$450K revenue

**Post-Launch Monitoring**:
```
Day 1: Monitor payment success rate (target > 95%)
Day 2: Check abandonment rate (target < 40%)
Day 3: Analyze GA4 data for payment_failed events
Week 1: A/B test payment button copy
Week 2: Measure ROI of changes
```

---

## 5 Complex Scenarios with Detailed Solutions

### Scenario 1: Black Friday Early Access Campaign

**Situation**: You want to offer VIP ticket pricing (40% off) to your best 500 attendees from last year for 48 hours only, then open to public with 20% off.

**Tracking Challenges**:
1. Identify "VIP" segment from year 1
2. Track which cohort purchased (VIP vs. Public)
3. Measure impact of early access (did it drive urgency?)
4. Prevent VIP code from being shared publicly

**Solution**:

```javascript
// Step 1: Identify returning VIP attendees (server-side)
// Database query during login:

SELECT user_id, email 
FROM attendee_history 
WHERE event_year = 2025 
AND total_revenue > $1000  // Spent more than average
AND nps_score > 8;  // Satisfied
// Result: 487 VIP candidates

// Step 2: Generate unique VIP codes
VIP_CODES = {
  'user_547821': 'VIP40-EARLYACCESS-001',
  'user_664902': 'VIP40-EARLYACCESS-002',
  ...
}

// Step 3: Track VIP cohort separately
window.dataLayer.push({
  'event': 'view_item',
  'content': {
    'item_id': 'ticket_full_conference',
    'item_name': 'Full Conference Pass'
  },
  'user': {
    'user_id': 'user_547821',
    'cohort': 'vip_returning',  // 🔑 Key differentiator
    'years_attending': 3,
    'lifetime_value': '$2,854'
  },
  'campaign': {
    'campaign_name': 'vip_early_access_2026',
    'access_window': '48_hours',
    'discount_tier': 'vip_40_percent'
  }
});

// Step 4: Track VIP purchase separately
window.dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'order_8471923_vip',
    'value': 599.40,  // 40% off
    'currency': 'USD',
    'coupon': 'VIP40-EARLYACCESS-001'
  },
  'purchase': {
    'purchase_cohort': 'vip_early_access',
    'days_before_public_launch': 2,
    'original_price': 999.00,
    'discount_amount': 399.60,
    'discount_percentage': 40
  },
  'user': {
    'user_id': 'user_547821',
    'cohort': 'vip_returning',
    'repurchase': true  // Returning customer
  }
});

// Step 5: GA4 Reports to Measure Success
// Report 1: "VIP vs Public Cohort Comparison"
// Rows: cohort (VIP, Public), Metrics: transactions, revenue, AOV
// Expected: VIP AOV higher, convert rate higher, loyalty signaled

// Report 2: "Early Access Impact"
// Rows: purchase_cohort, time_in_campaign
// Expected: Most VIP purchases happen in first 24 hours (urgency works)

// Report 3: "Code Sharing Detection"
// Query: Count distinct IPs using same VIP code
// If same code used from 10+ IPs: likely being shared
// Action: Retire code + send retention email to VIP

// Business Outcome:
// - VIP revenue: $300K+ at 40% discount
// - Public (early bird) revenue: $700K at 20% discount
// - Total: $1M early bird revenue
// - Insight: VIP cohort generates 30% of revenue from 10% of attendees
```

---

### Scenario 2: B2B Lead Scoring & Enterprise Sales Funnel

**Situation**: You have 50+ corporate sponsors who send teams of 5-10 people. You need to identify which teams are most likely to become long-term consulting clients and route them to sales.

**Tracking Challenges**:
1. Connect individual attendees to their company
2. Score team engagement across all members
3. Identify decision-makers vs. attendees
4. Route high-intent companies to sales

**Solution**:

```javascript
// Step 1: On registration, ask "Is this a company team?"
window.dataLayer.push({
  'event': 'form_submitted',
  'form': {
    'form_id': 'conference_registration',
    'form_name': 'Team Registration'
  },
  'user': {
    'user_id': 'user_547821',
    'email': 'alice@techcompany.com',
    'company': 'Tech Company Inc',
    'job_title': 'Senior UX Manager'
  },
  'registration': {
    'registration_type': 'team',  // vs. individual
    'company_size': '100-500',
    'annual_revenue': '$50M-$100M',
    'industry': 'Technology',
    'number_of_attendees': 8  // Team size
  }
});

// Step 2: Create "Company Profile" object in CRM
// CRM Record: company_techcompany_001
// ├─ Company Name: Tech Company Inc
// ├─ Industry: Technology
// ├─ Company Size: 100-500 employees
// ├─ Annual Revenue: $50M-$100M
// ├─ Number of Attendees: 8
// ├─ Team Members: [user_547821, user_664902, user_712847, ...]
// └─ Engagement Score: 0 (to be calculated)

// Step 3: Track individual engagement events with company context
window.dataLayer.push({
  'event': 'session_attended',
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design',
    'track': 'AI & Automation'
  },
  'user': {
    'user_id': 'user_547821',
    'company': 'company_techcompany_001'  // Link to company profile
  },
  'engagement': {
    'session_rating': 5,
    'participated_in_qa': true,
    'took_notes': true,
    'engagement_points': 10
  }
});

// Same person attends another session:
window.dataLayer.push({
  'event': 'session_attended',
  'content': {
    'session_id': 'sess_09182',
    'session_title': 'Service Design for Enterprise Scale'
  },
  'user': {
    'user_id': 'user_547821',
    'company': 'company_techcompany_001'
  },
  'engagement': {
    'session_rating': 4,
    'participated_in_qa': true,
    'engagement_points': 8
  }
});

// Other team members also track engagement:
window.dataLayer.push({
  'event': 'sponsor_booth_interaction',
  'sponsor': {
    'sponsor_name': 'Service Design Tool Co'
  },
  'user': {
    'user_id': 'user_664902',
    'company': 'company_techcompany_001'
  },
  'interaction': {
    'interaction_duration_minutes': 15,
    'engagement_points': 12,
    'contact_captured': true
  }
});

// Step 4: Server-side aggregation (calculate company engagement score)
// Business Logic:

COMPANY_SCORE = {
  'company_techcompany_001': {
    'total_attendees': 8,
    'attendees_engaged': 6,  // Attended sessions
    'total_engagement_points': 87,
    'average_points_per_person': 10.9,
    'high_value_signals': {
      'executive_present': true,  // C-level attendee detected
      'decision_maker_present': true,  // Budget owner identified
      'multiple_sessions_attended': true,
      'booth_engagement': true,
      'qa_participation': true
    },
    'interest_signals': {
      'relevant_track_attendance': ['AI & Automation', 'Service Innovation'],
      'downloaded_resources': 3,
      'requested_follow_up': true
    },
    'sales_score': 82,  // Out of 100
    'sales_recommended_action': 'call_immediately'
  }
}

// Step 5: Send high-scoring companies to sales CRM
window.dataLayer.push({
  'event': 'conversion_achieved',
  'conversion': {
    'conversion_id': 'conv_847293_bsales',
    'conversion_type': 'b2b_sales_lead',
    'conversion_value': 75000,  // Estimated annual contract value
    'conversion_probability': 0.68
  },
  'company': {
    'company_id': 'company_techcompany_001',
    'company_name': 'Tech Company Inc',
    'sales_score': 82,
    'recommendation': 'hot_lead'
  }
});

// Step 6: GA4 Reports for B2B Sales
// Report: "High-Value Companies by Engagement"
// Rows: company_name, attendees, avg_engagement, sales_score
// Expected Result: 
// - Top 10 companies have score > 75
// - Estimated pipeline: $2.5M from top 10 companies
// - 15 of top 20 typically convert to consulting (75% close rate)

// Step 7: Sales Follow-up Automation
// For each high-score company:
// ├─ Email 1 (Day 1): Thank you + takeaway PDF
// ├─ Email 2 (Day 3): "Your team attended these sessions..."
// ├─ Email 3 (Day 7): Schedule 30-min consultation
// └─ Email 4 (Day 14): Special offer for enterprise teams
```

**Expected Outcome**:
- ✅ 50 corporate teams analyzed
- ✅ 15-20 identified as "hot leads" (score > 75)
- ✅ $2.5M consulting pipeline created
- ✅ Sales team has automated nurture sequence
- ✅ 75% close rate expected (typical for warm B2B leads)

---

### Scenario 3: International Multi-Currency Conference (EU/APAC Expansion)

**Situation**: You're expanding the conference to Europe and Asia. You need to track purchases in 8 currencies, measure sponsor ROI differently per region, and understand regional preferences.

**Tracking Challenges**:
1. Correct currency conversion for ROI analysis
2. Regional pricing differences (local purchasing power)
3. Regional sponsor effectiveness differences
4. Language/localization tracking

**Solution**:

```javascript
// Step 1: Detect user region and set currency
// Server-side (on page load):

const userCountry = await geoIPLookup(request.ip);
// Returns: { country: 'DE', region: 'Europe', currency: 'EUR' }

// Step 2: Push region + currency to GA4
window.dataLayer.push({
  'event': 'page_view',
  'geolocation': {
    'country': 'DE',
    'country_name': 'Germany',
    'region': 'Europe',
    'currency': 'EUR'
  },
  'user': {
    'user_id': 'user_789456',
    'user_region': 'eu'
  }
});

// Step 3: Set currency-specific pricing
// PRICING (same value, different currencies):
// US (USD): $999.00 (Full Conference Pass, 1-day: $349)
// UK (GBP): £799.00 (conversion: 1.25x)
// EU (EUR): €949.00 (regional adjustment: -5% for volume)
// Singapore (SGD): $1,299.00 (conversion: 1.3x + premium)
// Australia (AUD): $1,549.00 (conversion: 1.55x)
// Japan (JPY): ¥109,900 (conversion)
// India (INR): ₹83,240 (localizedpricing: much lower)
// Brazil (BRL): R$4,995.00

window.dataLayer.push({
  'event': 'view_item',
  'content': {
    'item_id': 'ticket_full_conference',
    'item_name': 'Full Conference Pass'
  },
  'ecommerce': {
    'price_original': 999.00,  // USD reference
    'price_local': 949.00,  // EUR
    'currency': 'EUR',
    'discount_regional': 0.05  // 5% regional discount
  },
  'geolocation': {
    'country': 'DE',
    'region': 'Europe',
    'currency_code': 'EUR'
  }
});

// Step 4: Track purchase with regional context
window.dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'order_8472000_eu_de',
    'value': 949.00,  // EUR
    'currency': 'EUR',
    'items': [{
      'item_id': 'ticket_full_conference',
      'item_name': 'Full Conference Pass',
      'price': 949.00,
      'currency': 'EUR'
    }]
  },
  'purchase': {
    'purchase_region': 'EMEA',
    'purchase_country': 'Germany',
    'purchase_currency': 'EUR',
    'price_tier': 'regional_discount',  // Different from USD
    'local_payment_method': 'sepa_transfer'  // EU-specific
  },
  'user': {
    'user_id': 'user_789456',
    'region': 'EU'
  }
});

// Step 5: Regional Sponsor ROI Tracking
// Different sponsors active in different regions

// Europe: 12 sponsors (tech-focused)
// APAC: 8 sponsors (VC-focused)
// Americas: 15 sponsors (established enterprises)

window.dataLayer.push({
  'event': 'sponsor_booth_interaction',
  'sponsor': {
    'sponsor_id': 'sponsor_sap',  // German company
    'sponsor_name': 'SAP'
  },
  'user': {
    'user_id': 'user_789456',
    'region': 'EU'
  },
  'interaction': {
    'region_sponsor_active': true,  // SAP is featured in EU
    'engagement_points': 15,
    'contact_captured': true
  },
  'sponsor_analytics': {
    'sponsor_booth_region': 'EU',
    'attendee_region': 'EU',
    'region_match': true  // Same region = higher interest
  }
});

// Step 6: Language & Content Preference Tracking
window.dataLayer.push({
  'event': 'page_view',
  'page': {
    'path': '/schedule',
    'language': 'de'  // German interface
  },
  'user': {
    'preferred_language': 'de',
    'region': 'EU'
  },
  'content': {
    'sessions_in_preferred_language': 18,  // Of 52 total
    'sessions_in_english': 34
  }
});

// Step 7: Regional Session Preferences Analysis
// EU Tracking:
window.dataLayer.push({
  'event': 'session_viewed',
  'content': {
    'session_id': 'sess_12847_de',  // German session
    'session_title': 'Die Zukunft von KI im Service Design',
    'language': 'de',
    'region': 'EU'
  },
  'user': {
    'region': 'EU',
    'language': 'de'
  }
});

// Step 8: GA4 Regional Reports
// Report 1: "Revenue by Region"
// Rows: region, Metrics: transactions, revenue, AOV
// Expected: EU revenue $500K, APAC $300K, Americas $1.2M

// Report 2: "Regional Sponsor Performance"
// Rows: sponsor_name, region
// Columns: interaction_count, lead_capture_rate, avg_time
// Expected: Regional sponsors (SAP in EU) outperform global sponsors

// Report 3: "Language Preferences & Conversion"
// Rows: preferred_language, Metrics: sessions_attended, conversion_rate
// Expected: Sessions in user's language convert 20% better

// Report 4: "Currency & Local Payment Method ROI"
// Rows: currency, payment_method
// Metrics: transaction_count, avg_order_value, failed_transaction_rate
// Expected: SEPA transfers in EU have higher success rate than cards

// Step 9: Attribution Adjustments per Region
// US (last-click works): Email drives final conversion
// EU (GDPR concerns): Multi-touch needed (less retargeting data)
// APAC (mobile-first): SMS + WhatsApp touchpoints important

window.dataLayer.push({
  'event': 'purchase',
  'attribution': {
    'model': 'linear',  // EU: use linear (GDPR limitations)
    'window': 14,  // EU: shorter window
    'channels_in_path': ['organic', 'email'],
    'region_adjusted': true
  },
  'geolocation': {
    'country': 'DE',
    'region': 'EU',
    'gdpr_compliant': true
  }
});

// Expected Business Outcome:
// - EU revenue: €500K (1,050 tickets x €476 avg)
// - APAC revenue: A$465K (310 tickets x A$1,500 avg)
// - Total international: $1M (30% of revenue, 2nd year!)
// - Next year goal: 40% international
```

---

### Scenario 4: Sponsor Lead Capture Program (Real-Time Dashboard)

**Situation**: Sponsor sales teams are at booths and want REAL-TIME lead scoring. When someone spends 10+ minutes at a booth and provides their email, you need to immediately show sponsor reps whether this is a "hot lead" or "follow-up lead" so they can prioritize conversations.

**Tracking Challenges**:
1. Capture email at booth without interrupting experience
2. Real-time engagement scoring (5-10 second delay max)
3. Push lead quality to sponsor dashboard instantly
4. Track which sponsor got best leads (for next year sponsorship)

**Solution**:

```javascript
// Step 1: Booth QR Code Experience
// At each sponsor booth: "Tap this QR code for exclusive content"
// QR Links to: /booth/sponsor_acme_design/lead_capture

// Step 2: Lightweight Lead Form (blocking < 3 seconds)
// <form id="booth-lead-form">
//   <input type="email" placeholder="Email" required />
//   <select name="interest">
//     <option>Product Demo</option>
//     <option>Pricing Info</option>
//     <option>Custom Solution</option>
//   </select>
//   <button>Get Exclusive Content</button>
// </form>

// Step 3: Capture + Score Immediately
window.dataLayer.push({
  'event': 'sponsor_lead_captured',
  'lead': {
    'lead_id': 'lead_acme_001847',
    'lead_email': 'alice@company.com',
    'lead_company': 'Tech Company Inc',
    'lead_job_title': 'Senior UX Manager'
  },
  'sponsor': {
    'sponsor_id': 'sponsor_acme_design',
    'sponsor_name': 'Acme Design Tools',
    'booth_location': 'Booth A12'
  },
  'capture_method': 'qr_code_at_booth',
  'timestamp': '2026-06-15T14:32:00Z'
});

// Step 4: Enrichment Lookup (instant)
// Query: Do we have data on this person already?

if (userDatabase.exists('alice@company.com')) {
  const user = userDatabase.get('alice@company.com');
  
  window.dataLayer.push({
    'event': 'sponsor_lead_enriched',
    'lead_id': 'lead_acme_001847',
    'enrichment': {
      'existing_attendee': true,
      'attendee_data': {
        'previous_attendance': 2025,  // Repeat attendee
        'sessions_attended': 9,
        'engagement_score': 8.5,
        'tracks_interested': ['AI & Automation', 'Service Innovation']
      },
      'registration_data': {
        'company': 'Tech Company Inc',
        'company_size': '100-500',
        'industry': 'Technology',
        'job_level': 'manager'  // Decision-maker potential
      }
    }
  });
}

// Step 5: Lead Score Calculation (Real-Time)
const leadScore = calculateLeadScore({
  is_repeat_attendee: 2,  // +2 points
  previous_engagement_score: 8.5,  // +8.5 points
  job_level: 'manager',  // +5 points (decision-maker)
  company_size: '100-500',  // +3 points
  track_alignment: 1,  // Session attended in Acme's specialty +1
  booth_interaction_type: 'qr_scan',  // +2 points
  time_of_interaction: '14:32',  // +1 point (mid-day = engaged)
  // TOTAL: 22.5 / 30 = 75% LEAD QUALITY
});

window.dataLayer.push({
  'event': 'lead_scored',
  'lead_id': 'lead_acme_001847',
  'lead_score': {
    'total_score': 75,  // Out of 100
    'score_tier': 'hot_lead',  // hot (75-100), warm (50-74), cold (<50)
    'recommended_action': 'call_immediately',
    'follow_up_urgency': 'high',
    'probability_of_close': 0.68
  }
});

// Step 6: Push to Sponsor Dashboard (via WebSocket)
// Real-time update (< 1 second latency):

SPONSOR_DASHBOARD_UPDATE = {
  booth_id: 'booth_acme_a12',
  new_lead: {
    lead_name: 'Alice Johnson',
    lead_email: 'alice@company.com',
    lead_company: 'Tech Company Inc',
    lead_quality: 'HOT_LEAD 🔥 75%',  // Visual indicator
    timestamp: '14:32:15',
    notes: 'Repeat attendee, attended AI track (your specialty), senior role'
  },
  dashboard_notification: '🔔 NEW HOT LEAD at Booth A12'
};

// Sponsor rep on iPad sees instantly: 
// "Alice Johnson from Tech Company just checked in - 🔥 HOT LEAD"
// Recommendation: "Go talk to them NOW about AI product demo"

// Step 7: Track Sponsor Conversation Quality
// After booth conversation (rep enters notes):

window.dataLayer.push({
  'event': 'sponsor_lead_engagement',
  'lead_id': 'lead_acme_001847',
  'sponsor': {
    'sponsor_id': 'sponsor_acme_design',
    'sponsor_rep_id': 'rep_12847'  // Track which rep handled lead
  },
  'conversation': {
    'interaction_duration_minutes': 12,
    'topics_discussed': ['AI product demo', 'pricing', 'integration'],
    'interest_level_from_rep': 'very_high',
    'next_step': 'demo_scheduled_june_22'
  },
  'lead_conversion': {
    'lead_quality_score_initial': 75,
    'lead_quality_score_after_chat': 85,  // Rep increased score
    'booking_link': 'amedemo.acme.com/leads/alice',
    'estimated_deal_value': 50000  // Estimate based on company size
  }
});

// Step 8: Post-Event: Sponsor ROI Tracking
// Report: "Sponsor Booth Performance"

SPONSOR_PERFORMANCE = {
  'sponsor_acme_design': {
    'total_leads_captured': 47,
    'hot_leads': 12,
    'warm_leads': 24,
    'cold_leads': 11,
    'hot_lead_close_rate_rate_estimate': 0.68,  // ML prediction
    'estimated_deals_from_booth': 8,
    'estimated_revenue_from_booth': $400000,
    'roi_multiple': 5.3,  // $400K revenue / $75K sponsorship = 5.3x
    'recommendation': 'increase sponsorship next year (proven ROI)'
  }
}

// Step 9: GA4 Sponsor Performance Report
// Rows: sponsor_name, Metrics:
// - leads_captured, hot_lead_count, avg_lead_score
// - post_event_bookings, estimated_revenue, roi_multiple

// Expected Outcome:
// - 47 qualified sponsor leads (vs. 5-10 from random booth visits)
// - 8 estimated deals = $400K revenue
// - Sponsor ROI: 5.3x (vs. typical 2-3x)
// - Sponsors renew at higher tier next year
```

---

### Scenario 5: Session Recording Sales Funnel (Post-Event Revenue)

**Situation**: Post-event, you sell access to recorded sessions ($49 per session or $149 for all 52 sessions). You need to understand which attendees are most likely to buy recordings and identify high-value content that attracts new (non-attendee) buyers.

**Tracking Challenges**:
1. Separate "attendee recording purchases" from "non-attendee purchases"
2. Identify which videos generate most re-watch + sharing
3. Track recording buyers through to consulting sales (long tail)
4. Measure multi-event engagement (is someone attending specifically to buy recordings?)

**Solution**:

```javascript
// Step 1: When accessing session recordings (attendee)

window.dataLayer.push({
  'event': 'page_view',
  'page': {
    'path': '/recordings/sess_12847_chen_ai',
    'title': 'Session Recording: The Future of AI in Service Design'
  },
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design',
    'speaker_name': 'Dr. Sarah Chen',
    'recording_type': 'full_session'
  },
  'user': {
    'user_id': 'user_547821',
    'event_attendance_status': 'attended',  // KEY: They went to live event
    'ticket_tier': 'full_conference'
  },
  'pricing': {
    'per_session_price': 49.00,
    'all_access_price': 149.00,
    'free_for_attendees': true  // Some models offer free to attendees
  }
});

// Step 2: Non-attendee discovers recording via YouTube/Google Search

window.dataLayer.push({
  'event': 'page_view',
  'page': {
    'path': '/recordings/sess_12847_chen_ai',
    'referrer': 'youtube'  // Or: 'google_search', 'reddit', etc.
  },
  'content': {
    'session_id': 'sess_12847',
    'session_title': 'The Future of AI in Service Design'
  },
  'user': {
    'user_id': 'user_new_891237',
    'event_attendance_status': 'not_attended',  // KEY: New audience
    'event_attendance_prior': false  // Never attended any conference
  },
  'traffic_source': {
    'source': 'youtube',
    'utm_campaign': 'organic_social_share'  // Someone promoted it
  }
});

// Step 3: Video Engagement Tracking

window.dataLayer.push({
  'event': 'video_engaged',
  'video': {
    'video_id': 'rec_12847_full',
    'video_title': 'The Future of AI in Service Design',
    'video_duration_seconds': 3660
  },
  'engagement': {
    'time_watched_seconds': 2845,
    'completion_rate': 0.78,
    'paused_count': 5,
    'skipped_ahead': true,
    'rewatched_segments': ['intro', 'case_study_1', 'q&a']
  },
  'user': {
    'user_id': 'user_new_891237',
    'event_attendance_status': 'not_attended'
  }
});

// Step 4: Purchase Behavior - Single Recording
// User decides to buy one recording:

window.dataLayer.push({
  'event': 'add_to_cart',
  'ecommerce': {
    'value': 49.00,
    'currency': 'USD',
    'items': [{
      'item_id': 'rec_12847',
      'item_name': 'Session Recording: The Future of AI in Service Design',
      'price': 49.00,
      'quantity': 1,
      'item_category': 'Recording',
      'item_category_2': 'single_session'
    }]
  }
});

// Step 5: All-Access Bundle Purchase
// Another user buys full access ($149 for 52 sessions):

window.dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'order_8472100_recordings',
    'value': 149.00,
    'currency': 'USD',
    'items': [{
      'item_id': 'rec_bundle_all_2026',
      'item_name': 'Full Conference 2026 Recordings (52 Sessions)',
      'price': 149.00,
      'quantity': 1,
      'item_category': 'Recording',
      'item_category_2': 'all_access'
    }]
  },
  'purchase': {
    'bundle_type': 'all_access',
    'sessions_included': 52,
    'price_per_session': 2.87  // Good value signal
  },
  'user': {
    'user_id': 'user_new_891237',
    'event_attendance_status': 'not_attended',
    'purchase_type': 'recording_access_only'
  }
});

// Step 6: Re-engagement & Upsell

// User watches recording, wants to learn more:
window.dataLayer.push({
  'event': 'form_submitted',
  'form': {
    'form_id': 'speaker_followup_request',
    'form_name': 'Request Speaker Contact'
  },
  'content': {
    'speaker_id': 'spk_0914',
    'speaker_name': 'Dr. Sarah Chen',
    'session_id': 'sess_12847',
    'form_context': 'user_watched_recording'  // I.e., interested party
  },
  'user': {
    'user_id': 'user_new_891237',
    'recordings_watched': 8,
    'purchase_status': 'recording_buyer'
  }
});

// Step 7: Conversion: From Recording Buyer to Consulting Pipeline

// Admin approves speaker intro, they connect:
window.dataLayer.push({
  'event': 'conversion_achieved',
  'conversion': {
    'conversion_id': 'conv_891237_consult_from_recording',
    'conversion_type': 'consulting_consultation_scheduled',
    'conversion_value': 15000  // Estimate based on new client value
  },
  'source': {
    'source_path': 'attended_event → bought_recording → watched_8_sessions → contacted_speaker → consultation_scheduled'
  },
  'user': {
    'user_id': 'user_new_891237',
    'acquisition_channel': 'recording_program',
    'customer_journey_length': 'extended'  // Multi-step conversion
  }
});

// Step 8: Identify High-Performing Content

// GA4 Report: "Top 10 Recording Performers"
// Rows: session_title, Metrics:
// - videos_watched, avg_completion_rate, avg_rating
// - purchases_driven, consulting_leads_driven

TOP_RECORDINGS = [
  {
    rank: 1,
    session: 'The Future of AI in Service Design',
    speaker: 'Dr. Sarah Chen',
    views: 2847,
    avg_completion_rate: 0.78,
    buys_driven: 156,
    recording_revenue: $7644,
    consulting_leads: 3,
    consulting_revenue: $45000
  },
  {
    rank: 2,
    session: 'Service Design for Enterprise Scale',
    speaker: 'Jane Doe',
    views: 1924,
    avg_completion_rate: 0.72,
    buys_driven: 89,
    recording_revenue: $4361,
    consulting_leads: 1,
    consulting_revenue: $12000
  }
];

// Step 9: Attribution: Recording Program Impact

RECORDING_PROGRAM_METRICS = {
  'recording_sales': {
    'single_sessions_purchased': 312,
    'revenue_from_singles': $15288,
    'all_access_bundles_purchased': 478,
    'revenue_from_bundles': $71202,
    'total_recording_revenue': $86490
  },
  'consulting_uplift': {
    'consulting_leads_from_recordings': 12,
    'close_rate': 0.67,  // 67% close
    'closed_deals_amount': '$180000',
    'recording_program_roi': 2.88  // $180K / $62.5K (dev + hosting)
  },
  'next_year_goal': {
    'increase_recording_views': '3000 → 5000',
    'increase_consulting_pipeline': '$180K → $400K',
    'recommendation': 'invest more in recording distribution (YouTube, social)'
  }
}

// Expected Outcome:
// - Recording program revenue: $86K (new revenue stream)
// - Consulting pipeline from recordings: $180K
// - Total: $266K from post-event engagement
// - ROI: 2.88x (vs. 5.3x for sponsor program, but more scalable)
```

---

## Interview Q&A: What to Expect

### Q1: "Walk me through a omplete GA4 implementation for a conference. What events would you track?"

**Answer Structure** (Your 2-minute answer):

"I'd implement GA4 with three event categories:

**Funnel Events** (Awareness → Decision):
- page_view (ticket page, schedule)
- view_item (specific sessions attended)
- begin_checkout (ticket tier selected)
- purchase (completed registration)

**Engagement Events** (Pre- and Post-event):
- Custom 'session_attended' (via beacon tracking at the venue)
- 'session_rated' (post-session feedback 1-5 stars)
- 'sponsor_booth_interaction' (duration + lead capture)

**Value Events** (Business outcomes):
- 'conversion_achieved' (consultation booked post-event)

**Data Layer would include**:
- User ID (persist across sessions)
- Ticket tier + price paid
- Track/session interest (personalization)
- Geographic + company data (B2B segmentation)

**GA4 Setup**:
- GA4 Measurement ID configured
- 5+ conversion goals (purchase, lead capture, email signup)
- Custom dimensions for ticket_tier, company_size
- Data-driven attribution enabled (if 10K+ conversions)

The beauty of this setup: You can measure which marketing channels drive ACTUAL attendees vs. just clicks—so you know whether to spend more on LinkedIn or email."

### Q2: "We have 40% cart abandonment at the payment step. How would you debug this?"

**Answer Structure** (Your 3-minute answer):

"I'd take a three-pronged approach:

**1. Data Analysis (GA4 + Hotjar)**:
- Pull GA4 Funnel Report:  See where the 40% drops
- Pull 20 Hotjar session recordings of users who abandoned at payment
- Watch for patterns:
  └─ Payment button unresponsive? (Technical)
  └─ Error messages confusing? (UX)
  └─ Trust indicators missing? (Psychology)
  └─ Form too long? (Friction)

**2. Technical Audit**:
- Is the payment.js library loading? (Check Network tab)
- Stripe integration: test payment with live card (from Stripe dashboard)
- Error logs: are we logging why payments fail?
- Timeout: Is the timeout 3s or 8s? (3s too short for international)

**3. Implementation Changes**:
Example: If I found users entering wrong card expiration, I'd change:
OLD: "Your card was declined"
NEW: "Your card's expiration date (MM/YY) is invalid. Please check and retry."

Then:
- A/B test two payment UX variations (50% to each)
- Monitor GA4 'payment_failed' event count
- Track successful payments in 'purchase' event
- Goal: Get from 40% → 25% abandonment rate

**Expected Outcome**: Should recover 5-10% additional revenue."

### Q3: "How would you set up server-side GTM? Why would we do this?"

**Answer Structure** (Your 2:30 minute answer):

"**Why Server-Side GTM**:

iOS changed the game. Before iOS 14.5 (2021), cookies worked fine. After: browsers delete third-party cookies after 7 days. Google's server-side GTM fixes this by:
- Using YOUR domain (yourconference.com/gtag) instead of googletagmanager.com
- Creates first-party cookie (survives 13 months instead of 7 days)
- Prevents data loss: recovers 30-40% of iOS tracking

**How I'd Set It Up**:

1. Create server-side GTM container in Tag Manager console
2. Deploy to Cloudflare Workers (30 lines of code):
   └─ Accepts POST request from client-side
   └─ Forwards high-value events (purchases) to GA4 + CRM

3. Update client-side code:
   └─ In addition to standard GTM, also POST to /gtag/collect
   
4. Configure GA4 to accept server-side events (Measurement Protocol)

5. Database connections (server auth):
   └─ Google Ads Conversion API (for retargeting)
   └─ HubSpot CRM (for lead follow-up)

**Code Example**:
```javascript
// Browser sends purchase:
fetch('/gtag/collect', {
  method: 'POST',
  body: JSON.stringify({
    event: 'purchase',
    user: { email: 'alice@company.com' },
    ecommerce: { value: 799, currency: 'USD' }
  })
})

// Server forwards to GA4 + CRM
// Result: First-party tracking survives iOS restrictions
```

**Business Impact**: +30% revenue recovery on iOS devices"

### Q4: "How would you recommend marketing budget allocation if you have 6 channels (Organic, Email, Ads, LinkedIn, Facebook, Referral)?"

**Answer Structure** (Your 2-minute answer):

"I'd use **multi-touch attribution** (not last-click):

**Method**:
1. Configure GA4 with Linear or Position-Based attribution
2. Run reports for each channel:
   - First-touch rate (awareness value)
   - Last-touch rate (conversion value)  
   - Middle-touch rate (nurture value)

3. Calculate true ROI per channel

**Example Data** (Hypothetical):
- Email: First-touch 10%, Last-touch 70% → Heavily dependent on awareness
- LinkedIn: First-touch 70%, Last-touch 5% → Drives awareness, doesn't close
- Google Ads: First-touch 60%, Last-touch 30% → Full-funnel player
- Organic: First-touch 40%, Last-touch 15% → Content-driven discovery

**Budget Recommendation**:
- Underfunded: LinkedIn (drives 70% awareness) → increase $50K
- Optimized: Google Ads (consistent across funnel) → maintain $100K
- Overleveraged: Email (needs LinkedIn awareness to work) → reduce $10K
- New investment: Organic content (feeds paid funnel) → add $15K

**Expected Outcome**: +$150-200K revenue by rebalancing toward areas that drive awareness (not just closings)."

### Q5: "A client is concerned about iOS privacy impacts on their conversion tracking. What do you tell them?"

**Answer Structure** (Your 2:30 minute answer):

"**The Problem:**
iOS 14.5+ (2021): Apple blocked third-party cookie tracking. Result: Lose 30-40% of iPhone conversion data.

**Our Solution Stack**:

1. **Server-Side GTM** (immediate):
   - Firstparty cookie scope (not affected by Apple's restrictions)
   - Survives 13 months instead of 7 days
   - Latency: < 5 seconds
   - Result: +30% data recovery

2. **GA4 Features**:
   - modeling (fill gaps in missing conversions)
   - Cross-device tracking (if user logs in, link web + app conversions)
   - Consent Mode (tells Google to switch to model-based when privacy consent missing)

3. **CRM Integration**:
   - Server-side GTM sends purchase to HubSpot directly
   - Email/phone is primary identifier (not cookies)
   - CRM has accurate record regardless of browser tracking

4. **Conversion API**:
   - Send purchase events directly to Google Ads + Facebook
   - Bypasses browser entirely
   - Can use email as conversion identifier

**Bottom Line**: 
"Yes, iOS changes tracking. But with server-side GTM + Conversion API, we recover 70-80% of lost data. Your conversion tracking will be 85-90% accurate (was previously 100%, now we accept 85-90% given privacy constraints)."

### Q6: "How would you plan a 2-week GTM audit for an enterprise client?"

**Answer Structure** (Your 3-minute answer):

**Week 1: Discovery + Audit**

Day 1-2: Baseline Assessment
- [ ] List all active GTM tags (goal: 30-40 for enterprise)
- [ ] Map tags to business events (which events matter most?)
- [ ] Check GA4 integration (confirmed G-XXXXXXXXXX tracking?)
- [ ] Audit data layer (is it actually firing events?)

Day 3: Data Quality Check
- [ ] 100 purchases: Do all have transaction_id?
- [ ] 100 form submissions: Capture email + source?
- [ ] High-value events: Less than 2% error rate?
- [ ] Compare GA4 revenue to actual revenue (should be 90-98% match)

Day 4-5: Issue Documentation
- [ ] Interview 3-5 internal stakeholders (dev team, marketing, finance)
- [ ] Identify top 5 data quality issues
- [ ] Prioritize by business impact (not technical difficulty)

**Week 2: Quick Wins + Strategy**

Day 6-8: Implementation
- Fix top 3 data quality issues (e.g., missing transaction IDs)
- Deploy server-side GTM if not already present
- Update GA4 conversion goals to match business metrics

Day 9-10: Reporting + Training
- [ ] Create GA4 dashboards for 3 audience types:
  └─ Finance (ROI per channel)
  └─ Marketing (conversion funnel)
  └─ Executive (top KPIs only)
- [ ] Document findings in 5-page report
- [ ] Train team on troubleshooting

**Expected Outcome**:
- Identify $100K-$500K in revenue tracking gaps
- Fix → recover that tracking
- Establish baseline for optimization

---

## Complete Troubleshooting Guide

### Issue 1: GA4 Shows 80% Different Revenue than Accounting System

**Symptoms**:
- Last month: GA4 reports $500K revenue
- Accounting system: $600K revenue
- Difference: $100K (17% gap that can't be explained)

**Root Causes** (in priority order):

1. **Transaction ID Duplicates** (Most common, 40% of cases)
   - Same order placed twice (network retry)
   - GA4 counts both, accounting deduplicates
   
   **Fix**:
   ```javascript
   // Add logic to prevent duplicate transaction IDs
   const transactionId = `order_${orderId}_${timestamp.getTime()}`;
   
   // Check if already sent in last 10 minutes
   const recentTransactions = localStorage.getItem('recent_txns');
   if (recentTransactions.includes(transactionId)) {
     console.log('Duplicate, skipping...');
     return;
   }
   
   window.dataLayer.push({
     event: 'purchase',
     ecommerce: {
       transaction_id: transactionId,  // Now unique
       value: 599.99
     }
   });
   ```

2. **Timezone Mismatch** (20% of cases)
   - GA4 may be UTC, accounting may be EST
   - Late-night orders get counted in different days
   
   **Fix**: Verify all timestamps use same UTC offset

3. **Refunds Not Tracked** (20% of cases)
   - Customer refunded $50, GA4 still shows $599.99
   - Accounting shows net $549.99
   
   **Fix**:
   ```javascript
   // Track refund events separately
   window.dataLayer.push({
     event: 'refund',
     ecommerce: {
       transaction_id: 'order_123',
       refund_amount: 50.00,  // Negative value tracked separately
       reason: 'customer_request'
     }
   });
   ```

4. **Partial Payments** (10% of cases)
   - Installment plan: $200 + $200 + $199 over 3 months
   - GA4 might count only first $200
   
   **Fix**: Flag installment orders differently, sum total in reporting

5. **Currency Conversion Issues** (10% of cases)
   - Sold in EUR, GA4 converts to USD at yesterday's rate
   - Accounting uses today's rate
   
   **Fix**: Track both original currency + USD-converted

**Validation**:
```sql
-- Query: Find discrepancies
SELECT 
  DATE(order_date),
  COUNT(*) as accounting_orders,
  SUM(order_amount) as accounting_revenue
FROM orders
WHERE order_date > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(order_date)

-- Compare to GA4:
SELECT 
  date,
  COUNT(*) as ga4_transactions,
  SUM(value) as ga4_revenue
FROM ga4.purchase_events
WHERE date > DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY date

-- Variance should be < 3%
```

---

### Issue 2: Custom Event "session_attended" Not Showing in GA4

**Symptoms**:
- Beacon fires sensor at session start
- Pushes to dataLayer: `{ event: 'session_attended', ... }`
- GA4 shows 0 'session_attended' events
- But purchase events ARE appearing in GA4

**Root Causes** (debug in order):

1. **Event Name Case Sensitivity** (Most likely)
   ```javascript
   // WRONG:
   dataLayer.push({ event: 'Session_Attended' });  // Capital S + underscore
   
   // GA4 expects:
   { event: 'session_attended' }  // lowercase
   
   // Fix: Standardize all event names to lowercase with underscores
   window.dataLayer.push({ event: 'session_attended' });  // ✓
   ```

2. **GTM Tag Not Published** (30% of cases)
   - Created GA4 tag for 'session_attended'
   - But forgot to PUBLISH the container
   
   **Fix**:
   1. Go to Google Tag Manager console
   2. Check version history (top right)
   3. Is latest version PUBLISHED? (Should show green checkmark)
   4. If not: Click "Submit" → write note → "Publish"

3. **GA4 Tag Trigger Misconfigured** (20% of cases)
   ```
   OLD Trigger:
   "Custom Event" = "sessionattended"  ← WRONG spelling
   
   NEW Trigger:
   "Custom Event" = "session_attended"  ← CORRECT
   ```

4. **Event Fires Before GA4 Config Tag** (15% of cases)
   - Logic: 'session_attended' fires before GA4 Measurement ID is set
   - Result: GA4 doesn't know where to sent the event
   
   **Fix**: Ensure GA4 Config Tag loads on ALL PAGES with priority higher than custom events
   ```
   GTM Tag Priority:
   1. GA4 Configuration Tag (priority: 10)
   2. Custom event tags (priority: 5)
   3. Third-party tags (priority: 1)
   ```

5. **Data Layer Push Uses Wrong Variable Names**
   ```javascript
   // WRONG:
   dataLayer.push({
     event: 'session_attended',
     session_id: 'sess_123'  // GA4 won't access this
   });
   
   // RIGHT: Must use GA4 parameter names
   dataLayer.push({
     event: 'session_attended',
     session_id: 'sess_123',  // Custom dimension must be registered in GA4
     parameters: {
       'session_id': 'sess_123'
     }
   });
   ```

**Validation**:
1. Open GTM Preview Mode
2. Navigate to session page → beacon fires
3. Look for 'session_attended' in GTM Preview (Tag Manager console)
4. If you see it here but not in GA4: Issue is with GA4 tag itself
5. If you DON'T see it here: Issue is with GTM trigger/tag setup

---

### Issue 3: iOS Users Not Tracking on Purchase Events (ITP Impact)

**Symptoms**:
- Desktop conversion rate: 2.5%
- iOS conversion rate: 0.8% (way too low)
- iOS traffic is 35% of total (should have proportional conversions)
- Estimated loss: $150K-$300K annually

**Root Cause**: iOS Intelligent Tracking Prevention (ITP)
- iOS deletes third-party cookies after 7 days
- If user visits site week 1, buys week 2 → no attribution

**Solution (Server-Side GTM)**:

```javascript
// OLD (Client-side only - fails on iOS):
window.dataLayer.push({
  event: 'purchase',
  ecommerce: { transaction_id: 'order_123' }
});
// Result on iOS: 7-day cookie expires before purchase

// NEW (Client-side + Server-side):

// 1. Still push to client-side GA4:
window.dataLayer.push({
  event: 'purchase',
  ecommerce: { transaction_id: 'order_123', value: 599 }
});

// 2. ALSO send to server-side GTM:
fetch('https://yourconference.com/gtag/collect', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event: 'purchase',
    user: { email: 'user@example.com', user_id: 'user_123' },
    ecommerce: { transaction_id: 'order_123', value: 599 }
  })
});

// 3. Server-side GTM (Cloudflare Workers) receives this:
export default {
  async fetch(request) {
    const body = await request.json();
    
    // Forward to GA4 with Measurement Protocol
    // (server-to-server, not browser-to-browser)
    await forwardToGA4(body);
    
    // Forward to Google Ads Conversion API
    // (server-to-server, more reliable)
    await forwardToGoogleAds(body);
    
    return new Response(JSON.stringify({status: 'ok'}));
  }
}

// Result:
// - First-party cookie set at yourconference.com
// - Survives 13 months on iOS (vs. 7 days for third-party)
// - Server forwards high-value events directly
// - iOS attribution problem SOLVED
```

**Expected Outcome**: Increase iOS tracking by 30-40%, recovering $150K-$300K

---

### Issue 4: Attribution Model Shows All Credit to Email (Last-Click Bias)

**Symptoms**:
- 70% of "last click" is email
- 20% of "last click" is organic
- 10% of "last click" is ads

But ads team says: "We drive awareness, email just closes. You're underfunding us."

**Root Cause**: Last-click attribution is biased toward conversion-stage channels.

**Solution: Multi-touch attribution**

```javascript
// GA4 Configuration:
// Admin → Attribution Settings → Select multiple models:
// 1. Last Click: {70% email, 20% organic, 10% ads}
// 2. First Click: {60% ads, 30% organic, 10% email}
// 3. Linear: {40% email, 35% ads, 25% organic}
// 4. Time Decay: {50% email, 30% ads, 20% organic}
// 5. Data-Driven: {ML model}

// Create Report: "Attribution Model Comparison"
// Rows: model_type
// Columns: channel, credit_percentage

COMPARISON = {
  'last_click': {
    'email': 70,
    'organic': 20,
    'ads': 10
  },
  'first_click': {
    'email': 10,
    'organic': 30,
    'ads': 60  // Ads drive awareness! Different story
  },
  'linear': {
    'email': 40,
    'organic': 35,
    'ads': 25
  }
}

// Recommendation:
// Email is critical for CLOSING (last-click wins)
// But email ROI depends on Ads creating awareness first
// TRUE budget split: Ads 40%, Email 40%, Organic 20%
// (vs. last-click suggesting: Email 70%, Ads 10%)
```

**Expected Outcome**: Identify underinvested awareness channels, rebalance budget for +15-20% ROI

---

### Issue 5: GA4 Dashboard Shows 50K Daily Users but Only 500 Purchases (0.1% Conversion)

**Symptoms**:
- GA4: 50,000 daily active users
- Actual: ~5,000 conference ticket sales per day
- Conversion should be ~10%, but GA4 shows 0.1%
- Something is wrong with user counting

**Root Causes** (most likely):

1. **Pageview Counted as Multiple Users** (40% of cases)
   - Google Analytics counts each session as a distinct user if no user_id set
   - Same person visiting twice = 2 users
   
   **Fix**: Set user_id for logged-in users
   ```javascript
   window.dataLayer.push({
     'user_id': 'user_547821',  // Set for authenticated users ONLY
     'event': 'page_view'
   });
   ```

2 **Bot Traffic Not Filtered** (30% of cases)
   - SEO bots, scrapers, ad verification bots = 90% of traffic
   - GA4 counts them as users
   
   **Fix**: Apply GA4 Bot Filter:
   ```
   GA4 Admin → Data Streams → Web → More tagging settings
   → "Enable Enhanced Measurement" → "Exclude Bot Traffic"
   ```

3. **Cross-Domain Tracking Not Set Up** (20% of cases)
   - If you have multiple domains (conference.com, tickets.conference.com, etc.)
   - GA4 treats each as separate user
   
   **Fix**: Configure cross-domain tracking in GA4 settings

4. **Identify Session vs. User Count Confusion** (10% of cases)
   - GA4 shows "50K sessions" (interactions)
   - But user count is "5K users" (unique people)
   - Mistake: using session count instead of user count
   
   **Fix**: Use correct metric in dashboard
   ```
   Right Metric: Unique Users = 5K per day
   Wrong Metric: Sessions = 50K per day (10 interactions per user average)
   ```

---

### Issue 6: Server-Side GTM Causing Duplicate Events in GA4

**Symptoms**:
- Deploy server-side GTM
- Now purchase events appear TWICE in GA4
- Revenue doubled (looks good, but wrong)
- ROI calculations now meaningless

**Root Cause**: Both client-side AND server-side pushing same event

```javascript
// Browser pushes to GTM (client-side):
window.dataLayer.push({
  event: 'purchase',
  ecommerce: { transaction_id: 'order_123', value: 599 }
});

// Browser ALSO fetches server-side GTM (duplicate):
fetch('/gtag/collect', { ... });

// Result: GA4 receives purchase event twice
// Solution: Only let server-side process high-value events
```

**Fix**:

```javascript
// Option 1: Stop client-side from sending purchase to GA4
// (Let server-side be the source of truth)

GTM Tag Settings:
├─ GA4 Config Tag triggers: "All Pages" (still runs)
├─ GA4 Purchase Tag triggers: "Never" (disabled, server handles it)
└─ Server-Side GTM handles purchase events only

// Option 2: Stop server-side if client already sent
// (Requires client + server coordination)

const hasClientSideGA4 = window.gtag !== undefined;

if (hasClientSideGA4) {
  // Skip sending to GA4 from server (client already sent)
  await skipDestination('GA4');
} else {
  // Server sends to GA4 (client doesn't have GA4)
  await forwardToGA4(body);
}
```

**Expected Outcome**: Single, accurate event stream in GA4

---

## Deployment Checklist

Before launching to production:

```
PRE-LAUNCH VALIDATION (Day Before)
☐ GA4 Events Report shows 500+ test events
☐ All purchase events have transaction_id + value
☐ Data layer variables match GA4 custom dimensions
☐ Cross-browser testing (Chrome, Safari, Firefox)
☐ Mobile testing (iOS + Android)
☐ Server-side GTM tested with 100 sample events
☐ Latency check: events reach GA4 within 5 seconds
☐ Error rate monitoring set up (<1% failures)
☐ Alerts configured (notify if events drop > 50%)

LAUNCH DAY
☐ 6:00 AM: Backup current GTM configuration
☐ 6:30 AM: Publish new GTM container to 1% of traffic
☐ 7:00 AM: Monitor GA4 Real-time report (look for events)
☐ 7:30 AM: Check for errors in error logs
☐ 8:00 AM: If stable: rollout to 100% traffic
☐ 9:00-12:00 PM: Monitor every 30 minutes
☐ 1:00 PM: Monitor daily (watch for overnight issues)

WEEK 1 POST-LAUNCH
☐ Compare GA4 revenue to accounting (should match 95%+)  
☐ Check payment failure rates (should be < 5%)
☐ Validate custom events firing (check sample)
☐ Review error logs for patterns
☐ Document any data quality issues

ONGOING MONITORING
☐ Daily: GA4 events count should be stable ±10% day-over-day
☐ Weekly: Revenue comparison (GA4 vs accounting)
☐ Monthly: Attribution model review (is budget allocation optimal?)
☐ Quarterly: A/B test improvements to conversion funnel
```

---

## Key Metrics to Monitor

```
DAILY TRACKING
├─ Page Views: Trend up towards event date
├─ Ticket Page Visitors: Should spike 30 days before
├─ Checkout Completions: Monitor for drop-offs
└─ Purchase Revenue: Compare to projection

WEEKLY TRACKING
├─ Conversion Funnel: track → checkout drop rate
├─ Attribution Summary: Which channels drive conversions?
├─ Customer Acquisition Cost (CAC): By channel
└─ Refund Rate: Should be <2%

MONTHLY TRACKING
├─ Cohort Retention: Are last year's attendees returning?
├─ Post-Event Conversions: Recordings/consulting sales
├─ Sponsor ROI: Leads generated per sponsor
└─ Email List Growth: New subscribers from event

ANNUAL TRACKING
├─ Year-over-Year Growth: Revenue, attendees, engagement
├─ Customer Lifetime Value: What % become consulting clients?
├─ Content Performance: Which sessions drive most consulting leads?
└─ Attribution Model Performance: Data-driven vs. last-click improvement
```

---

## Summary: Technical Implementation

This guide covers enterprise-grade GA4 tracking for a conference platform with:

✅ **Complete data layer** with 25+ events (funnel + engagement + value)  
✅ **30+ GTM tags** configured correctly  
✅ **Server-side GTM** for privacy compliance + iOS recovery  
✅ **5 Day-1 tasks** with estimated time + business impact  
✅ **5 complex scenarios** with detailed code examples  
✅ **6 interview Q&A** with full answers  
✅ **Troubleshooting guide** for 6 common issues  

**Expected Results**:
- Revenue tracking: 90-98% accuracy
- iOS tracking recovery: +30-40% data
- Sponsor lead quality: 75% conversion potential
- Post-event consulting pipeline: $180K-$400K annually
