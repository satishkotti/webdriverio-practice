/*
** Imports
*/

/*
** Describe: Sub-Domain Support for search / URL look-up
*/

    /*
    ** Describe: Verify whether user is displayed with appropriate search results
    **            when the user searches for sub-domain assets using Global Search in PB2 app
    */
        /*
        ** Describe: User must be displayed with asset read-only screen when the 
        **           user searches for the asset using it's chronicle id
        */
            /*
            ** Before
            */
                //Launch app and login
                //Search for the asset using it's chronicle id

            /*
            ** It
            */
                //Verify whether the asset read-only screen is displayed

        /*
        ** Describe: User must be displayed with asset read-only screen when the 
        **           user searches for the asset using it's friendly-url
        */
            /*
            ** Before
            */
                //Search for the asset using it's friendly-url

            /*
            ** It
            */
                //Verify whether the asset read-only screen is displayed

        /*
        ** Describe: User must be displayed with search results when the 
        **           user provides a keyword in the global search
        */
            /*
            ** Before
            */
                //Search for assets using the keyword

            /*
            ** It
            */
                //Verify whether search results are displayed

    /*
    ** Describe: Verify whether the URL Look-up fields in PB2 app accepts asset id's/url's 
    **           from Sub-Domains without prompting the user to create a pointer
    */
        /*
        ** Before
        */
            //Create a Shared Module
            //Populate the look-up field with chronicle id of a sub-domain asset

        /*
        ** It
        */
            //Verify whether the asset read-only screen is displayed

