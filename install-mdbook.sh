#!/bin/bash

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)
    machine=Linux
    if [ ! -f "mdbook" ]; then 
        wget -c https://github.com/rust-lang/mdBook/releases/download/v0.4.17/mdbook-v0.4.17-x86_64-unknown-linux-gnu.tar.gz -O - | tar -xz
    fi
    ;;
    Darwin*)    
    if [ ! -f "mdbook" ]; then 
        wget -c https://github.com/rust-lang/mdBook/releases/download/v0.4.17/mdbook-v0.4.17-x86_64-apple-darwin.tar.gz -O - | tar -xz
    fi
    machine=Mac;;
    *)          machine="UNKNOWN:${unameOut}"
esac
chmod +x mdbook