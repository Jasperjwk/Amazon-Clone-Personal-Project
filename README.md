# Amazon-Clone-Personal-Project

# Hosting URL:

https://clone-personal-project-ffbc3.web.app


![amazon](https://user-images.githubusercontent.com/63961200/116091214-33abab00-a6d7-11eb-8920-b8827095a7b6.gif)


# Tech in my project build
1) User Authentication (Username & Password)
2) Stripe API (Payment)
3) React + React Hooks
4) React context API --> LIKE REDUX pattern
5) Material UI
6) Flexbox
7) Firebase's Firestore realtime Database
8) Firebase Hosting
9) Firebase Authentication (Full login!)



# My Project build (Stripe)

* Stripe functionality
* Checkout page (payment page)
* Cloud function to process stripe payment (severless)
* Firebase for real-time database (Firestore)
* MERN Stack

npm init (functions > y > y)

# Steps to deploy my project using firebase

1) npm install -g firebase-tools
2) firebase init (hosting > build > y > n)
3) npm run build
4) firebase use "project id"
5) firebase deploy
6) To rerun the build, repeat step 3 and run step 5 to "firebase deploy --only hosting" (front-end) instead of "firebase deploy" 


# My Personal notes

C:\Users\th6ri\amazon-clone-personal-projectt\functions>firebase emulators:start

When my app has been deployed and if i want to change my code in local host, i have to run "npm run build" to update the code in deployed app

npx create-react-app amazon-clone-personal-project

firebase database - allows me to save things so that it will be stored in the database

npm install -g firebase-tools
npm install @material-ui/core
npm install @material-ui/icons
npm install react-router-dom
npm install react-currency-format
npm install firebase
npm install @stripe/stripe-js
npm i @stripe/react-stripe-js
npm install axios
npm install express
npm install cors
npm install stripe
npm install moment 
firebase emulators:start
Must upgrade to firebase blaze(Spark) plan in order for "firebase deploy --only functions" (must be inside function folder) to run successfully

6:36

function folder - full back-end ( cloud functions)
app (front-end)

make sure i am inside function folder for npm install

An element with position: relative; is positioned relative to its normal position. Setting the top, right, bottom, and left properties of a relatively-positioned element will cause it to be adjusted away from its normal position.

The z-index property in CSS controls the vertical stacking order of elements that overlap.

object-fit: contain - The replaced content is scaled to maintain its aspect ratio while fitting within the element's content box

margin-right: auto; The auto keyword will give the right side a share of the remaining space. When combined with margin-left: auto , it will center the element, if a fixed width is defined.

{/* ?. - optional chaining - if i don't have the correct value or basket comes undefined due to error, it will not freak out but it will gracefully handles the error */}
   {basket?.length}

 /* It will stick to the top as we scroll down */
    position: sticky;

    /* important will overwrite the material icon style */
    height: 22px !important;

    /* Stretch the screen as big as it can go */
    flex: 1;

flex-direction: column;

    /* Snaps everything into the view point */
    width: 100%;

/* flex-end : lines packed to the end of the container */
    justify-content: flex-end;

.home{
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 1500px;
}

    /* The max-content sizing keyword represents the intrinsic maximum width of the content. */
    height: max-content;

    {/* initial state is what the data layer looks like in the beginning */}
    {/* Reducer - how i manipulate with the datalayer, how i play with it */}
    <StateProvider initialState={initialState} reducer={reducer}>

                    {/* example rating is 5, i take the 5 and fill it and map through
                    that number. If it's 5, it's gonna map through 5 times */}
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p>⭐</p>
                        ))}
                </div>

.checkoutProduct__image {
    object-fit: contain;
    width: 180px;
    height: 180px;
}

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                // Go through all of the basket items 
                // And if any of the basketItem.id matches the action id i parse in
                // Finds the first one and returns it to me
                (basketItem) => basketItem.id === action.id
            );

**Use width

    /* % will stretch whereas px will make it smaller */
    width: 98%;

.login__logo {
    margin-top: 20px;
    margin-bottom: 20px;
    object-fit: contain;
    width: 100px;
    margin-right: auto;
    margin-left: auto;
}

/* Fit the content that i actually have inside the container */
height: fit-content;

                    // I map the value email to this email state which connects the two things
                    value={email} 
                    // Whenever the user types in, it will trigger onChange which gives me an event and it will fire off this event.
                    // e.target.value is what the user types in, as the user types in, i am setting the email and it gets map to {email}
                    onChange={e => setEmail(e.target.value)}/>

{/* If there's no user, only then we render the login page */}
<Link to= {!user && "/login"}>

Benefits of history.push()
{/* In some areas, you see me using the Link component which is a really
good way to get a link. If i want to programatically in any point 
push the user somewhere, then i can use the history.push  */}

.payment__container > h1 a {
    /* Get rid of underscore */
    text-decoration: none;
}

//Takes up 80% of aspect ratio
.payment__address, .payment__items {
    flex: 0.8;
}

<button disabled={processing || disabled || succeeded}>
	<span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
</button>

// Stop users from clicking the buy button multiple times 
// It only allows them to click once and it will block
setProcessing(true);

// Orders.js

    useEffect(() => {
        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        // This gives me the real time snapshot of the database
        // This means if i push value into the database, 
        // Snapshot will provide a real time response,
        // This will update base on real time 
        .onSnapshot(snapshot => {
            // Return all the orders as documents
            // Map through every single one 
            // For each document, return an object
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

.order {
    padding: 40px;
    margin: 20px 0;
    border: 1px solid lightgray;
    background-color: white;
    position: relative;
}

.order__id {
    position: absolute;
    top: 40px;
    right: 20px;
}
