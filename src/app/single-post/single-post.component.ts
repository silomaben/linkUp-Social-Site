import { Component } from '@angular/core';




@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent {
  post: {
    post: {
      post_id: string;
      user_id: string;
      image: string;
      body: string;
      datetime: string;
      tagged_users: string;
      likes_count: number;
    }[];
    comments: {
      comment_id: number;
      user_id: string;
      body: string;
      datetime: string;
      like_count: number;
      subcomments: {
        subcomment_id: number;
        user_id: string;
        body: string;
        datetime: string;
        like_count: number;
      }[];
    }[];
  } = {
    post: [
      {
        post_id: "90af0c8b-7ee7-48a8-a494-927c82598db3",
        user_id: "unregistered_user",
        image: "https://cdn.pixabay.com/photo/2023/08/20/20/03/planes-8203121_1280.jpg",
        body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
        datetime: "9/3/2023, 11:06:47 AM",
        tagged_users: "",
        likes_count: 0
      }
    ],
    comments: [
      {
        comment_id: 1,
        user_id: "unregistered_user",
        body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
        datetime: "9/3/2023, 11:58:02 AM",
        like_count: 1,
        subcomments: [
          {
            subcomment_id: 1,
            user_id: "silomaben",
            body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
            datetime: "9/3/2023, 12:17:52 PM",
            like_count: 1
          }
        ]
      },
      {
        comment_id: 2,
        user_id: "42plus0",
        body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
        datetime: "9/3/2023, 11:58:02 AM",
        like_count: 1,
        subcomments: [
          {
            subcomment_id: 1,
            user_id: "seshAmbasador",
            body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
            datetime: "9/3/2023, 12:17:52 PM",
            like_count: 1
          }
        ]
      },
      {
        comment_id: 3,
        user_id: "silomaben",
        body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
        datetime: "9/3/2023, 11:58:02 AM",
        like_count: 1,
        subcomments: [
          {
            subcomment_id: 1,
            user_id: "johndoe",
            body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
            datetime: "9/3/2023, 12:17:52 PM",
            like_count: 1
          }
        ]
      }
    ]
  };
}

