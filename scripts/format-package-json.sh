#!/bin/bash
jq --indent 4 . package.json > tmp.json && mv tmp.json package.json
