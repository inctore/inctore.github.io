#!/bin/bash


script_dir=$(bash -c "cd $(dirname $0); pwd")

cd ${script_dir}/..
touch index.markdown
docker run \
       --rm \
       --volume=${script_dir}/..:/src/jekyll \
       jekyll/jekyll:4 \
       jekyll build --incremental
