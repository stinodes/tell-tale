workflow "Check, Deploy & Alias Master" {
  on = "push"
  resolves = [
    "Alias",
    "Deploy",
  ]
}

action "Install" {
  uses = "borales/actions-yarn@master"
  args = "install"
}
action "Test" {
  needs = "Install"
  uses = "borales/actions-yarn@master"
  args = "test"
  env = {
    CI = "true"
  }
}
action "Flow" {
  needs = "Install"
  uses = "borales/actions-yarn@master"
  args = "flow"
}
action "Check" {
  needs = ["Test", "Flow"]
}

action "Deploy" {
  needs = "Check"
  uses = "actions/zeit-now@master"
  secrets = ["ZEIT_TOKEN"]
}

action "Filter out master branch" {
  uses = "actions/bin/filter@master"
  needs = ["Deploy"]
  args = "branch master"
}

action "Alias" {
  uses = "actions/zeit-now@master"
  args = "alias"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Filter out master branch"]
}
