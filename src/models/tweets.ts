export class Tweet {
    constructor(
        public dateOfTweet = '',
        public message = '',
        public likes = '',
        public dateFetched = new Date()
    ) { }

    static Box(obj: any): Tweet {
        if (obj) {
            return new Tweet(
                obj.dateOfTweet,
                obj.message,
                obj.likes,
                new Date(obj.dateFetched)
            );
        }

        return new Tweet();
    }
}

export class Tweets {
    constructor(
        public tweets = new Array<Tweet>()
    ) { }

    static Box(arr: Array<any>): Array<Tweet> {
        if (arr && arr.length > 0) {
            var toReturn = new Array<Tweet>();
            for (var i = 0; i < arr.length; i++) {
                toReturn.push(Tweet.Box(arr[i]));
            }
            return toReturn;
        }

        return new Array<Tweet>();
    }
}
