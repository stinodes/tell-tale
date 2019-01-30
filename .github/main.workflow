workflow "Build on Push" {
  resolves = [
    "Yarn Build",
  ]
  on = "push"
}

action "Yarn Install Dependencies" {
  uses = "borales/actions-yarn@master"
  args = "install"
}

action "Yarn Flow" {
  uses = "borales/actions-yarn@master"
  needs = [
    "Yarn Install Dependencies",
  ]
  args = "flow"
}

action "Yarn Test" {
  uses = "borales/actions-yarn@master"
  needs = ["Yarn Install Dependencies"]
  args = "test"
  env = {
    CI = "true"
  }
}

action "Yarn Build" {
  needs = ["Yarn Test", "Yarn Flow", "Yarn Install Dependencies"]
  uses = "borales/actions-yarn@master"
  args = "build"
}
