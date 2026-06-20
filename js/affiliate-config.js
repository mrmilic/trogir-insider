/* ============================================================
   Trogir Insider — central affiliate configuration
   SINGLE SOURCE OF TRUTH for affiliate IDs.

   To go LIVE with Booking.com:
   set BOOKING_AFFILIATE_ID below to your real numeric Booking
   "aid". Nothing else has to change — every /go/booking link
   will immediately start carrying the ID.
   Leave it as "" until the affiliate account is approved; links
   still work (they just earn no commission yet).
   ============================================================ */
window.AFFILIATE = window.AFFILIATE || {};

// <-- Enter the real Booking.com affiliate ID (aid) here, e.g. "1234567"
window.AFFILIATE.BOOKING_AFFILIATE_ID = "";
