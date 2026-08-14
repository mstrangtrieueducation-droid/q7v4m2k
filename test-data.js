const A = "assets/images/";
const TOTAL_POINTS = 50;

const choice = (id, prompt, options, answer, explanation, image = "") => ({
  id, type: "choice", prompt, options, answers: [answer], explanation, image, points: 1
});
const input = (id, prompt, answers, explanation, image = "") => ({
  id, type: "input", prompt, answers, explanation, image, points: 1
});

const sections = [
  {
    key: "A", label: "A", title: "Look and write the words.",
    note: "Use the four picture labels. Write a, b, c, or d for each word.", points: 4,
    questions: [
      choice("A1", "1. candle", ["a", "b", "c", "d"], "b", "Picture b shows a candle with a flame.", A + "a-candle.png"),
      choice("A2", "2. balloon", ["a", "b", "c", "d"], "d", "Picture d shows a balloon.", A + "a-balloon.png"),
      choice("A3", "3. ice pop", ["a", "b", "c", "d"], "a", "Picture a shows an ice pop on a stick.", A + "a-ice-pop.png"),
      choice("A4", "4. popcorn", ["a", "b", "c", "d"], "c", "Picture c shows popcorn in a container.", A + "a-popcorn.png")
    ]
  },
  {
    key: "B", label: "B", title: "Look and complete the words.",
    note: "Use each picture and the given letters to complete the word.", points: 3,
    questions: [
      input("B1", "1. f _ _ w", ["flow"], "The water moves continuously over the edge, so the verb is flow.", A + "b-flow.png"),
      input("B2", "2. h _ _ t", ["heat"], "The kettle is used to make water hot, so the verb is heat.", A + "b-heat.png"),
      input("B3", "3. f _ _ _ z e", ["freeze"], "Water becomes ice when it gets very cold, so the verb is freeze.", A + "b-freeze.png")
    ]
  },
  {
    key: "C", label: "C", title: "Listen and complete the sentences.",
    note: "Listen carefully and write the missing word or phrase.", points: 4,
    audio: "assets/audio/Listening-C.mp3",
    questions: [
      input("C1", "1. Birds have ___ and can fly.", ["wings"], "Birds use their wings to fly."),
      input("C2", "2. We're going to the school ___.", ["play"], "A school play is a performance by students."),
      input("C3", "3. They're having ___ for dinner.", ["fish"], "The food named in the audio is fish."),
      input("C4", "4. We ___ vegetables. It makes them soft.", ["steam"], "We steam vegetables with hot water vapor; this makes them soft.")
    ]
  },
  {
    key: "D", label: "D", title: "Circle the correct words.",
    note: "Choose was, were, wasn't, or weren't to match the subject and meaning.", points: 4,
    questions: [
      choice("D1", "1. The girls was / were scared.", ["was", "were"], "were", "Girls means more than one girl, so use were."),
      choice("D2", "2. Brian was / were in class today.", ["was", "were"], "was", "Brian is one person, so use was."),
      choice("D3", "3. They wasn't / weren't happy about the test.", ["wasn't", "weren't"], "weren't", "They is plural, so use weren't."),
      choice("D4", "4. I wasn't / weren't at the playground.", ["wasn't", "weren't"], "wasn't", "Use was or wasn't with I in the past tense.")
    ]
  },
  {
    key: "E", label: "E", title: "Complete the sentences with was or were.",
    note: "Use was with a singular subject and were with a plural subject.", points: 4,
    questions: [
      input("E1", "1. We ___ happy.", ["were"], "We means more than one person, so use were."),
      input("E2", "2. He ___ calm.", ["was"], "He means one boy or man, so use was."),
      input("E3", "3. They ___ at the soccer match.", ["were"], "They is plural, so use were."),
      input("E4", "4. She ___ at the play.", ["was"], "She means one girl or woman, so use was.")
    ]
  },
  {
    key: "F", label: "F", title: "Listen and check the correct picture. Complete the sentence.",
    note: "Each number has two answers: choose picture a or b, then write was or were.", points: 6,
    questions: [
      {
        id: "F1", type: "pictureWord", points: 2, prompt: "1. It ___ a liquid.",
        pictures: [{ value: "a", image: A + "page2-img3-193x193.png" }, { value: "b", image: A + "page2-glass.png" }],
        parts: [
          { key: "picture", label: "Correct picture", type: "pictureChoice", answers: ["b"], explanation: "Picture b shows water in a glass, so it is the liquid." },
          { key: "word", label: "Missing word", type: "input", answers: ["was"], explanation: "It is singular, so use was: It was a liquid." }
        ]
      },
      {
        id: "F2", type: "pictureWord", points: 2, prompt: "2. They ___ hard.",
        pictures: [{ value: "a", image: A + "page2-img4-194x193.png" }, { value: "b", image: A + "page2-img5-194x193.png" }],
        parts: [
          { key: "picture", label: "Correct picture", type: "pictureChoice", answers: ["b"], explanation: "Picture b shows the hard-boiled eggs named in the audio." },
          { key: "word", label: "Missing word", type: "input", answers: ["were"], explanation: "They is plural, so use were: They were hard." }
        ]
      },
      {
        id: "F3", type: "pictureWord", points: 2, prompt: "3. It ___ a solid.",
        pictures: [{ value: "a", image: A + "page2-img6-193x193.png" }, { value: "b", image: A + "page2-img7-193x193.png" }],
        parts: [
          { key: "picture", label: "Correct picture", type: "pictureChoice", answers: ["a"], explanation: "The answer key identifies picture a for the solid described in the audio." },
          { key: "word", label: "Missing word", type: "input", answers: ["was"], explanation: "It is singular, so use was: It was a solid." }
        ]
      }
    ]
  },
  {
    key: "G", label: "G", title: "Look and circle the correct words.",
    note: "Choose the word that matches each picture.", points: 3,
    questions: [
      choice("G1", "1. Choose the correct word.", ["open", "closed"], "open", "The door is open.", A + "page3-img3-385x275.png"),
      choice("G2", "2. Choose the correct word.", ["fruit", "vegetables"], "fruit", "The picture shows fruit.", A + "page3-img4-385x275.png"),
      choice("G3", "3. Choose the correct phrase.", ["cream", "plastic bags"], "plastic bags", "The picture shows plastic shopping bags, not cream.", A + "page3-img8-385x275.png")
    ]
  },
  {
    key: "H", label: "H", title: "Listen and complete the sentences.",
    note: "Listen carefully and write one word in each gap.", points: 4,
    audio: "assets/audio/Listening-H.mp3",
    questions: [
      input("H1", "1. Please ___ me some juice.", ["pour"], "Pour means to make a liquid flow from one container into another."),
      input("H2", "2. I put ___ on my dinner.", ["salt"], "Salt is the ingredient named in the audio."),
      input("H3", "3. The ice cubes are in the ___.", ["freezer"], "A freezer keeps food and water cold enough to freeze."),
      input("H4", "4. A ___ has more than one thing in it.", ["mixture"], "A mixture is made when two or more things are combined.")
    ]
  },
  {
    key: "I", label: "I", title: "Look and write the words.",
    note: "Write the food shown in each picture.", points: 3,
    questions: [
      input("I1", "1.", ["pasta"], "The picture shows pasta.", A + "page3-img6-600x300.png"),
      input("I2", "2.", ["sugar"], "The picture shows sugar.", A + "page3-img7-600x300.png"),
      input("I3", "3.", ["salad"], "The picture shows a salad.", A + "page3-img9-600x300.png")
    ]
  },
  {
    key: "J", label: "J", title: "Complete the questions with Was or Were.",
    note: "Use Was for one person or place, and Were for more than one person or with you.", points: 5,
    questions: [
      input("J1", "1. ___ he sick today?", ["Was"], "He is singular, so the question begins with Was."),
      input("J2", "2. ___ you at the store?", ["Were"], "Questions with you use Were."),
      input("J3", "3. ___ your parents at the game?", ["Were"], "Parents means more than one parent, so use Were."),
      input("J4", "4. ___ they at school today?", ["Were"], "They is plural, so use Were."),
      input("J5", "5. ___ your sister at the movie theater?", ["Was"], "Your sister means one person, so use Was.")
    ]
  },
  {
    key: "K", label: "K", title: "Look at the pictures. Write questions and answers.",
    note: "Each number has two answers: write the full question and the full short answer.", points: 4,
    questions: [
      {
        id: "K1", type: "paired", points: 2, prompt: "1. she / at the park", image: A + "page4-img3-596x296.png",
        parts: [
          { key: "question", label: "Full question", type: "input", answers: ["Was she at the park?", "Was she at the park"], explanation: "Use Was + she + place: Was she at the park?" },
          { key: "answer", label: "Full answer", type: "input", answers: ["Yes, she was.", "Yes, she was"], explanation: "The picture shows her at the park, so answer: Yes, she was." }
        ]
      },
      {
        id: "K2", type: "paired", points: 2, prompt: "2. they / at the library", image: A + "page4-img6-567x300.png",
        parts: [
          { key: "question", label: "Full question", type: "input", answers: ["Were they at the library?", "Were they at the library"], explanation: "They is plural, so use Were: Were they at the library?" },
          { key: "answer", label: "Full answer", type: "input", answers: ["No, they weren't.", "No, they weren't", "No, they were not.", "No, they were not"], explanation: "The picture does not show them at the library, so answer: No, they weren't." }
        ]
      }
    ]
  },
  {
    key: "L", label: "L", title: "Use the prompts to write questions and answers.",
    note: "Write a complete question and a complete short answer for each prompt.", points: 6,
    questions: [
      {
        id: "L1", type: "paired", points: 2, prompt: "1. he / at school yesterday / yes", image: A + "page4-img5-539x300.png",
        parts: [
          { key: "question", label: "Full question", type: "input", answers: ["Was he at school yesterday?", "Was he at school yesterday"], explanation: "He is singular, so use Was: Was he at school yesterday?" },
          { key: "answer", label: "Full answer", type: "input", answers: ["Yes, he was.", "Yes, he was"], explanation: "The prompt says yes, so answer: Yes, he was." }
        ]
      },
      {
        id: "L2", type: "paired", points: 2, prompt: "2. you / at the movie theater / no",
        parts: [
          { key: "question", label: "Full question", type: "input", answers: ["Were you at the movie theater?", "Were you at the movie theater"], explanation: "Questions with you use Were: Were you at the movie theater?" },
          { key: "answer", label: "Full answer", type: "input", answers: ["No, I wasn't.", "No, I wasn't", "No, I was not.", "No, I was not"], explanation: "Answer a question with you from your own point of view using I: No, I wasn't." }
        ]
      },
      {
        id: "L3", type: "paired", points: 2, prompt: "3. they / at the puppet show / yes", image: A + "page4-img7-567x300.png",
        parts: [
          { key: "question", label: "Full question", type: "input", answers: ["Were they at the puppet show?", "Were they at the puppet show"], explanation: "They is plural, so use Were: Were they at the puppet show?" },
          { key: "answer", label: "Full answer", type: "input", answers: ["Yes, they were.", "Yes, they were"], explanation: "The prompt says yes, so answer: Yes, they were." }
        ]
      }
    ]
  }
];
