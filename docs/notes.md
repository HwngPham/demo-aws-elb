## Notes
Step by step:
  - create an elb stack (env): eb create
  - set stack as default: eb use `my-stack`
  - create application: eb init
  - deploy changes: eb deploy
  - remove env: eb terminate --all


## Hmmm
- healhcheck failed even though publish /health -> 200
- 