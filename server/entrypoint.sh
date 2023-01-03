#!/bin/bash

for file in /app/server/build/static/js/*; do
    sed -i "s#process.env.BACKEND_TEST_URL#${BACKEND_TEST_URL}#g" $file
    sed -i "s#process.env.BACKEND_SIMULATOR_URL#${BACKEND_SIMULATOR_URL}#g" $file
done

exec "$@"