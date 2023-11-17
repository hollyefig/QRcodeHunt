const data = [
  {
    q: "What is the answer to the first question?",
    options: [
      { text: "This one will be incorrect", isTrue: false },
      { text: "This one is the correct one", isTrue: true },
      { text: "This one will be incorrect", isTrue: false },
      { text: "This one will be incorrect", isTrue: false },
    ],
    hint: "Here is your first hint to your next QR code",
  },
  {
    keyMsg: "Alright, first one down! Let's go to the next one!",
    q: "What is the answer to the seconnnddd question?",
    options: [
      { text: "This one will be incorrect", isTrue: false },
      { text: "This one will be incorrect", isTrue: false },
      { text: "This one is the correct one", isTrue: true },
      { text: "This one will be incorrect", isTrue: false },
    ],
    hint: "Here is your seconnddd hint to your next QR code",
  },
  {
    keyMsg: "Halfway there, lemon on a pear!",
    q: "Okay third Question! What is it?",
    options: [
      { text: "This one is the correct one", isTrue: true },
      { text: "This one will be incorrect", isTrue: false },
      { text: "This one will be incorrect", isTrue: false },
      { text: "This one will be incorrect", isTrue: false },
    ],
    hint: "Here is your THIRRDDD hint to your next QR code",
  },
  {
    keyMsg: "Just one more to go!",
    q: "In the FFXIV Heavensward expansion, Sir Aymeric son of Thordin is the high lord of Ishgard. Of what great plight was he faced with?",
    options: [
      {
        text: "The Garlean occupation, oppressing the Ishgardians and falling under the Tyrannical rule of Zenos yae Galvus",
        isTrue: false,
      },
      {
        text: "The 1000-years Dragonsong War with the dragons due to the Ishgardian ancestors killing one of their kin, Ratatoskr",
        isTrue: true,
      },
      {
        text: "Facing the consequences of the Final Days due to Aymeric killing the dark lord Zodiark, cursing the Ishgardians to become blighted",
        isTrue: false,
      },
      {
        text: "Their country was plagued by a 100-year long curse of eternal light and the threat of the sin-eaters",
        isTrue: false,
      },
    ],
    hint: "Get that FINAL hint",
  },
  {
    keyMsg: "There it is!",
  },
];
