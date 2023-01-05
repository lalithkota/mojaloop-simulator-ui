#!/bin/bash

for file in /app/server/build/static/js/*; do
    sed -i "s#__BACKEND_TEST_URL_PROTO__#${BACKEND_TEST_URL_PROTO}#g" $file
    sed -i "s#__BACKEND_TEST_URL_HOST__#${BACKEND_TEST_URL_HOST}#g" $file
    sed -i "s#__BACKEND_TEST_URL_PORT__#${BACKEND_TEST_URL_PORT}#g" $file
    sed -i "s#__BACKEND_TEST_URL_PATH__#${BACKEND_TEST_URL_PATH}#g" $file
    sed -i "s#__BACKEND_SIM_URL__#${BACKEND_SIM_URL}#g" $file
done

exec "$@"