# giseye

Stands for GIS-eye (like the eye of a client ?). It is a web app designed to operate as a GIS client. The interface design aims to be the simplest and the more efficient, it is based on UIKit3 framework.

# Run in development

To run this in development mode, all you need is [GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [DOCKER](https://docs.docker.com/get-docker/) installed.

First clone the repo:
```
git clone https://github.com/Inogeo/giseye.git
```

Then run docker-compose:

```(shell)
docker-compose up
```

# Run in production

To build the app, run the special docker-compose:

```(shell)
docker-compose -f .\docker-compose.build.yml up
```


Documentation to deploy the build in production is not available yet.