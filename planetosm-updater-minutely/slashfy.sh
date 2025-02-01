#!/bin/bash
# Convert sequential dump number to directory path
# Example: 6451879 -> 006/451/879

printf "00%'9d" $1|sed -e "s/,/\//g"
