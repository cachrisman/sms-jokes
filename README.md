# Requirements

- Node
- Twilio
- Contentful

# Setup

1. Open a terminal and run `git clone https://github.com/cachrisman/sms-jokes; cd sms-jokes` to clone this repository.
1. Install the contentful-cli tool (`yarn global add contentful-cli`) and use it to create a new space in Contentful -OR- use the [Contentful webapp](https://app.contentful.com) to create a new space. Copy the space ID and delivery access token.
1. Copy the `.env.sample` file to `.env` and fill in the appropriate tokens.
1. Run `contentful-migration -s <SPACE_ID> 01-initial-content-model.js` to create the content model in your new Contentful space.
1. Go to the [Contentful webapp](https://app.contentful.com) and create some new sports jokes.
1. Back in your terminal, run `yarn` to install dependencies.
1. Run `yarn start:dev` to start the node app locally.
1. In a separate terminal window, run `ngrok http 5000` and copy the generated url into your Twilio dashboard under the messaging section of the phone number you want to use as a webhook.
1. You can also install and run [`now`](https://now.sh) to deploy the app and use the given now.sh url in your Twilio dashboard.

Viola! You can now send a text message with a sport name (as defined in Contentful) to your Twilio number and you will be sent a random joke about that sport in reply!
