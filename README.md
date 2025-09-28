# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Deploy

## On source machine

```sh
# Save the image to a tar file
docker save -o infix-finder.tar infix-finder:latest

# Transfer via scp
scp infix-finder.tar user@target-machine:/tmp/

```

## On target machine
```sh
# Load the image from tar file
docker load -i /tmp/infix-finder.tar

# Add a tag to image
docker tag <image-id> missing-link-solve:<tag>

# Clean up
rm /tmp/infix-finder.tar
```