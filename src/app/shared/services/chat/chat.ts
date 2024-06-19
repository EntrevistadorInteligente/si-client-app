export class ChatDB {

   // Chat User
   static chatUser = [
     {
       id: 0,
       name: 'Mark Jecno',
       status: 'Be the change',
       profile: 'assets/images/user/12.png',
       seen: 'online',
       online: true,
       typing: false,
       authenticate: 0,
       call: {
         status: 'incoming',
         date_time: '5 May, 4:40 PM'
       }
     },
     {
       id: 6,
       name: 'Elana Jecno',
       status: 'In Meeting..',
       profile: 'assets/images/user/1.jpg',
       seen: 'online',
       online: true,
       typing: false,
       authenticate: 1,
       call: {
         status: '',
         date_time: ''
       }
     },
     {
       id: 2,
       name: 'Aiden Chavez',
       status: 'Out is my favorite.',
       profile: 'assets/images/user/2.jpg',
       seen: 'Last Seen 3:55 PM',
       online: false,
       typing: false,
       authenticate: 0,
       call: {
         status: 'incoming',
         date_time: '6 May, 1:50 PM'
       }
     },
     {
       id: 3,
       name: 'Prasanth Anand',
       status: 'Change for anyone.',
       profile: 'assets/images/user/8.jpg',
       seen: 'online',
       online: true,
       typing: false,
       authenticate: 0,
       call: {
         status: 'outgoing',
         date_time: '7 May, 9:40 PM'
       }
     },
     {
       id: 4,
       name: 'Venkata Satyamu',
       status: 'First bun like a sun.',
       profile: 'assets/images/user/4.jpg',
       seen: 'online',
       online: true,
       typing: false,
       authenticate: 0,
       call: {
         status: 'incoming',
         date_time: '7 May, 10:50 PM'
       }
     },
     {
       id: 5,
       name: 'Ginger Johnston',
       status: 'its my life. Mind it.',
       profile: 'assets/images/user/5.jpg',
       seen: 'Last Seen 5:55 PM',
       online: false,
       typing: false,
       authenticate: 0,
       call: {
         status: 'outgoing',
         date_time: '7 May, 11:40 PM'
       }
     },
     {
       id: 1,
       name: 'Kori Thomas',
       status: 'status pending...',
       profile: 'assets/images/user/9.jpg',
       seen: 'online',
       online: true,
       typing: false,
       authenticate: 0,
       call: {
         status: 'outgoing',
         date_time: '8 May, 9:15 AM'
       }
     },
     {
       id: 7,
       name: 'Marked Thomas',
       status: 'away from home',
       profile: 'assets/images/user/11.png',
       seen: 'Last Seen 1:55 PM',
       online: false,
       typing: false,
       authenticate: 0,
       call: {
         status: 'incoming',
         date_time: '8 May, 10:50 Am'
       }
     },
   ]
 
   // Message
   static chat = [
     {
       id: 1,
       message: [
         {
           sender: 1,
           time: '10:12 am',
           text: 'Are we meeting today? Project has been already finished and I have results to show you.'
         },
         {
           sender: 0,
           time: '10:14 am',
           text: 'Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so?.'
         },
         {
           sender: 0,
           time: '10:14 am',
           text: 'Well I am not sure. The rest of the team.'
         },
         {
           sender: 1,
           time: '10:20 am',
           text: 'Actually everything was fine. I am very excited to show this to our team.'
         }
       ]
     },
     {
       id: 2,
       message: []
     },
     {
       id: 3,
       message: []
     },
     {
       id: 4,
       message: []
     },
     {
       id: 5,
       message: []
     },
     {
       id: 6,
       message: []
     },
     {
       id: 7,
       message: []
     },
     {
       id: 8,
       message: []
     }
   ]
   
   static call = [
    {
      profile: "assets/images/user/4.jpg",
      user: "Erica Hughes",
      date: "  5 May, 4:40 PM",
      callType: "share",
      callTypeColor: "danger"

    },
    {
      profile: "assets/images/user/1.jpg",
      user: "Vincent Porter",
      date: "  5 May, 5:30 PM",
      callType: "reply",
      callTypeColor: "success"
    },
    {
      profile: "assets/images/user/8.jpg",
      user: "Kori Thomas",
      date: "  5 May, 6:56 PM",
      callType: "share",
      callTypeColor: "danger"
    },
    {
      profile: "assets/images/user/2.jpg",
      user: "Aiden Chavez",
      date: "  3 June, 1:40 PM",
      callType: "reply",
      callTypeColor: "success"

    },
    {
      profile: "assets/images/user/4.jpg",
      user: "Erica Hughes",
      date: "  5 May, 4:40 PM",
      callType: "share",
      callTypeColor: "danger"

    },
    {
      profile: "assets/images/user/1.jpg",
      user: "Vincent Porter",
      date: "  5 May, 4:40 PM",
      callType: "reply",
      callTypeColor: "success"

    },
    {
      profile: "assets/images/user/4.jpg",
      user: "Erica Hughes",
      date: "  5 May, 4:40 PM",
      callType: "share",
      callTypeColor: "danger",
      

    },
    {
      profile: "assets/images/user/1.jpg",
      user: "Vincent Porter",
      date: "  5 May, 4:40 PM",
      callType: "reply",
      callTypeColor: "success"

    },
   ]
 }
 