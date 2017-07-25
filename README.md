# Einstein Platform Services

## Basic Setup (Language and Vision need this)

1. First, install this repo into your org.

  <a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
  </a>


2. From https://metamind.readme.io/docs/what-you-need-to-call-api#section-get-an-einstein-platform-services-account do the signpup
  * you should end up with a .pem file
  * don't do the **generate token** section (the package does that for you)

3. Do the **Upload Your Key** section.  Once the file uploads, be sure to share/make it visible to everyone in the org
4. In Salesforce, go to Custom Settings, to EinsteinVision, and then click Manage.
5. Create a new setting at the organizational default level
6. Set the Einstein Username you signed up with, and CertFile to be the name of the cert from step 3 (defaults to einstein_platform).  Leave CertName blank (that's for people using the old signup process).
  * This username will be a **real email address**
  * If you used the oAuth flow from a Salesforce login to sign up (like the instructions), the username is the **email address** attached to that user, which may not be the same as the Salesforce username
6. Pick a userId to be the Einstein user (bonus points for having a user named Einstein and setting their chatter picture!).
7. token expiration time should be 3600
8. certificate issuer: developer.force.com


## Validate the setup

1. *Try the standard model*: In Salesforce, create a vision model (you can call it anything) and set the `Einstein Trained Model Id` to `GeneralImageClassifier`
2. Post an image as a file or as a link to the Chatter feed.
3. Click on the comment box (live feed) or reload the page to see the response.
  * getting predictions and probabilities is good
  * getting "I don't have an answer for that" means your setup is probably wrong.

## Goal of this project
* Access Einstien in Salesforce without writing code

### Einstein Vision classifies photos.
Docs are here:
https://metamind.readme.io/docs/introduction-to-the-einstein-predictive-vision-service

### User creates a model and labels using Salesforce objects

  * Users can control the probability threshold and whether secondary predictions are shown.
  * Users can view (Lightning Experience Only) the model's statistics via a Lightning Component
  * Users can access the auth tokens via the browser console

### Users can clean up after themselves

* deleting a model in Salesforce deletes it from the PVS

### Users get predictions

* Invoke the model by posting either a file or an image to the chatter feed for that Label.
* Einstein (via another user) will chatter back the predictions according to the model's settings.

### Users can create examples via a local .bash script

```
	~/SomeOther/Place/directoryUploader.sh c7f7d45327504236c6dfd897cbeffd42a40be485 1952 795
```
where the three parameters are the `token`, the `labelId`, and the `modelId`. Note: you will have to make the script executable, like `chmod u+x directoryUploader.sh`.

After you create a model and some labels, click on a label to view the label-specific terminal command to run, including a valid token (#onlyInLightning).  You're welcome!

This directoryUploader will take every image in the user's current directory and upload it to that indicated label. Notice that the script is in some other place, and the current directory only has the images in it.

### Users can train a model

Just hit the train button on a model and the code will handle the rest #onlyInLightning Love those new Lightning Actions!

### Custom Settings

* Manage your Einstein Credentials
* Manage the security cert used when you sign up for an account
* **Be sure to populate these before trying to use the service**

### Using Standard Models
* For the food model, set the `Einstein Trained Model Id` to `FoodImageClassifier`
* For the general model, set the `Einstein Trained Model Id` to `GeneralImageClassifier`

### Fun things to do
* be sure to walk around with Salesforce1 attaching photos to a model of anything around.
* Have Einstein idenfity dog breeds

===

## Einstein Language

Follow all the Predictive Vision Setup stuff.

Invocable method from ProcessBuilder for calling standard or custom language models.

Invocable method from ProcessBuilder for supplying feedback (corrections to the model).

Lightning Components for creating custom language models based on
* data in Salesforce
* files attached via Chatter

Components for
* total Einstein Usage/Limits
* showing all labels and example count
* monitoring the status of model training completion



