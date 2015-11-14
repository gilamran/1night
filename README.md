== Game rules
* There are 3 players with names in the game
* There are 6 cards in the game
* Each player gets a random card, 3 cards on the table.


* The game manger api is:
    * Let players join and leave the server
    * Let players create new game.
    * Let players see the open games
    * Let players join an open game
    * An open game with 3 player will start automatically
    * [V2] Let players leave a game that was not started yet
    * [V2] Let players mark themselves as ready/not-ready 
    
* The game states are:
    * setup
    * dealer
        * shuffle
        * deal
    * Players see their cards
        * inform player about their cards        
    * roles
        * warewolfs
            1: * ask sole ware wolf to choose 1 cards from the table
               * show the warewolf the requested cards
            2: * inform ware wolfs about each other
        * seer (if exist)
            * ask seer which table cards to see
            * wait for response from the seer
            * show the seer the requested cards
        * robber (if exist)
            * ask robber which player he wants to switch with
            * wait for response from the robber
            * switch the cards
            * tell each player his new card
        * troublemaker (if exist)
            * ask troublemaker which players he wants to switch
            * wait for response from the troublemaker
            * switch the cards
            * tell each player his new card
    * votes
    * kill
    * winners
