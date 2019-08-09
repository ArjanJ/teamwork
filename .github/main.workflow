workflow "dev" {
  on = "push"
  resolves = ["Firebase Deploy"]
}

action "Install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run build:dev"
  needs = ["Install"]
}

action "Firebase Deploy" {
  uses = "w9jds/firebase-action@7d6b2b058813e1224cdd4db255b2f163ae4084d3"
  needs = ["Build"]
  args = "deploy -P dev --only hosting"
  secrets = ["FIREBASE_TOKEN"]
}
