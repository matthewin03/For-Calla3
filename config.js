/**
 * config.js — Central content configuration
 * Edit this file to update text, captions, and asset references.
 * All filenames with spaces/special chars must remain URL-encoded.
 */
window.CONFIG = {
  password: '02152026',

  // Feb 15, 2026 at 11:32 PM local time
  anniversaryDate: new Date('2026-02-15T23:32:00'),

  // All media assets live in this folder
  mediaBase: './',

  audio: {
    src: 'Daniel%20Caesar%20-%20Always%20(Official%20Audio).mp3',
  },

  intro: {
  videoSrc: 'Intro%20Video.mp4',
  overlayText: 'Happy One Month Baby ❤️',
  buttonText: 'See our story ↓',
},

  timelineBefore: [
    {
      date: 'August 18th',
      caption: '',
      media: [
        { type: 'image', src: 'August%2018th%20Pic%20%231.JPG', alt: 'August 18th' },
        { type: 'image', src: 'August%2018th%20Pic%20%232.JPG', alt: 'August 18th' },
      ],
    },
    {
      date: 'September 13th',
      caption: '',
      media: [
        { type: 'video', src: 'September%2013th%20Vid.MP4' },
      ],
    },
    {
      date: 'October 9th',
      caption: '',
      media: [
        { type: 'image', src: 'October%209th%20Pic.JPG', alt: 'October 9th' },
      ],
    },
    {
      date: 'October 11th',
      caption: '',
      media: [
        { type: 'image', src: 'October%2011th%20Pic%20%231.JPG', alt: 'October 11th' },
        { type: 'image', src: 'October%2011th%20Pic%20%232.JPG', alt: 'October 11th' },
      ],
    },
    {
      date: 'October 12th',
      caption: '',
      media: [
        { type: 'video', src: 'October%2012th%20Vid.MP4' },
      ],
    },
    {
      date: 'December 27th',
      caption: '',
      media: [
        { type: 'image', src: 'Dec_27th%20Pic.JPG', alt: 'December 27th' },
        { type: 'video', src: 'December%2027th%20Vid.MP4' },
      ],
    },
    {
      date: 'February 13th',
      caption: '',
      media: [
        { type: 'image', src: 'February%2013th%20Pic%20%231.JPG', alt: 'February 13th' },
      ],
    },
    {
      date: 'February 14th',
      caption: '',
      media: [
        { type: 'image', src: 'February%2014th%20Pic.JPG', alt: 'February 14th' },
      ],
    },
  ],

  // Add entries here after Feb 15 — same format as timelineBefore
  timelineAfter: [],

  loveNotes: [
    {
      icon: 'envelope',
      label: 'Things I missed',
      message: 'The way you stroke my arm sometimes lol.',
    },
    {
      icon: 'heart',
      label: 'Things I love',
      message: 'No matter what direction in life I go, I want to go there with you.',
    },
    {
      icon: 'gift',
      label: 'Things I\'m excited for',
      message: 'Us.',
    },
  ],

  letter: {
    salutation: 'Dear Calla Ko,',
    paragraphs: [
      "It's officially our one month!!! Man I don't even know where to start.. We've only officially been dating for a single month but it feels like we've been together for so much longer. The way we met, the way we started talking together, the types of conversations we've had, us flying across the country for each multiple times despite our doubts, worries, and whatever stress we have on our own lives, we kept showing up for each other in a way that many other couples could never imagine despite having been together for years longer.",
      "It's been a long time coming since we can officially say that you and I are boyfriend and girlfriend. I love how slow and intentional we were with our time to truly see if we are right for each other. And in between that time, we've had such emotionally wearing moments, moments where you and I both doubted if this was truly right… but despite all of that we're here now. And I believe that that makes our foundation for our partnership that much stronger. Yeah maybe it's a bit early to say, maybe it isn't. But you are already a partner to me in my eyes, and its only a matter of time as we grow older together that will be further solidified to something even more real.",
      "Thank you for your patience, your steadfast values, your intentionality, your values, your willingness to hear me, make me feel seen, heard, and to challenge yourself in order to give comfort and compassion towards me. I'm so grateful to have you. And Calla, I know you and I have talked about God and your doubts, as I have them as well. But to me, if you need proof of a God, I say look at a mirror. I truly believe that you are a Godly woman, even if you don't believe so. And I believe that you are a blessing from God. You came to me in a dark place, and you make me want to strive to be even better and continuously challenge myself from just existing.",
      "You are such a powerful force in my life. And I know that I have caused you much doubt, tears, and more; and although I can't say that I will be a perfect man. But one thing I can give you my word to: I will never give up on you and I. Thank you for giving me the privilege to be able to write this letter for you.",
      "I'm excited for our future. And it's gonna be a good one.",
    ],
    closing: 'With gentle love,',
    signature: 'Matthew In',
  },

  finalPolaroid: {
    imageSrc: 'February%2014th%20Pic.JPG',
    caption: "It's gonna be a good one.",
  },

  bts: {
    src: 'BTS%20Vid.mp4',
  },
};
