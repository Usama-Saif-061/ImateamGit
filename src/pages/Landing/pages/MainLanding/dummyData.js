const profileimage1 = require("./dummyAssests/profileimage1.jpeg");
const profileimage2 = require("./dummyAssests/profileimage2.jpeg");
const profileimage3 = require("./dummyAssests/profileimage3.jpeg");
const profileimage4 = require("./dummyAssests/profileimage4.jpeg");
const postimage1 = require("./dummyAssests/postimage1.jpeg");
const postimage2 = require("./dummyAssests/postimage2.jpeg");
const postimage3 = require("./dummyAssests/postimage3.jpeg");
const postimage4 = require("./dummyAssests/postimage4.jpeg");
const hah = require("./dummyAssests/sample-chandon.jpeg");


// export const users = [
//   {
//     id: 1,
//     email: "hassan@gmail.com",
//     password: "12345",
//     firstName: "hassan",
//     lastName: "ali",
//     Dob: "oct 11, 2021",
//     country: "USA",
//     interest: [],
//     cell: "+0123456",
//     posts: [],
//     followers: [],
//     following: [],
//     profileImage: profileimage1,
//   },
// ];

const postData = [
  {
    id: 1,
    profileName: "HASSAN",
    title: "HASSAN",
    postDate: "05/03/2021",
    postTime: "7:35:55 AM",
    profileImage: profileimage1,
    postDescription:
      "Another Beutiful day! Had a great day with friends, Ejoyyed a lot after so many years spending in pandemic ",
    postImage: hah,
    postLikes: [1, 2],
    postComments: [
      { profileImage: profileimage2,
        name: "Yaseen",
        time: "23 mins",
        comment: "Beautiful picture and have fun on your future endevours. These momnets are always memorable when you get apart from the team or organisation where you have spent too much time",
      },
      {profileImage: profileimage4, name: "Bilal", time: "5 mins", comment: "Absolutely amazing" },
    ],
    content : [
      {image: hah,
      type: "image/jpeg"
    },
    {image: postimage4,
      type: "image/jpeg"
    },
    {image: postimage2,
      type: "image/jpeg"
    },
    // {image: postimage2,
    //   type: "image/jpeg"
    // },
    ]
  },
  {
    id: 2,
    profileName: "Bilal",
    title: "Bilal",
    postDate: "01/03/2021",
    postTime: "8:35:55 AM",
    profileImage: profileimage2,
    postDescription: "Another Beutiful day!",
    postImage: postimage2,
    postLikes: [],
    postComments: [
      {profileImage: profileimage1, name: "Hassan", time: "23 mins",  comment: "The sunset looks stunning" },
    ],
    content : [
      {image: postimage2,
      type: "image/jpeg",}
    ]
  },
  {
    id: 3,
    profileName: "Abbas khan",
    title: "Abbas khan",
    postDate: "10/05/2021",
    postTime: "9:35:55 AM",
    profileImage: profileimage3,
    postDescription:
      "Another Beutiful day! Had a great day with friends, Ejoyyed a lot after so many years spending in pandemic",
    postImage: postimage3,
    postLikes: [],
    postComments: [],
    content : [
      {
      image: postimage3,
      type: "image/jpeg",
    },
    ]
  },
  {
    id: 4,
    profileName: "Omar",
    title: "Omar",
    postDate: "01/03/2021",
    postTime: "10:35:55 AM",
    profileImage: profileimage4,
    postDescription:
      "Another Beutiful day! Had a great day with friends, Ejoyyed a lot after so many years spending in pandemic",
    postImage: postimage4,
    postLikes: [],
    postComments: [],
    content : [
      {image: postimage4,
      type: "videos/quicktime",}
    ]
  },
];

export default postData
