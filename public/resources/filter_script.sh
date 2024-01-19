#!/bin/bash

# Check if a filename is provided as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

filename="$1"

# Check if the file exists
if [ ! -f "$filename" ]; then
    echo "File not found: $filename"
    exit 1
fi

# Create a temporary file to store the filtered content
tempfile=$(mktemp)

# Iterate through each line in the file
while IFS= read -r line; do
    # Check if the line contains "-"
    if [[ ! "$line" =~ [[:space:]] ]]; then
        # If not, append it to the temporary file
        echo "$line" >> "$tempfile"
    fi
done < "$filename"

# Overwrite the original file with the filtered content
mv "$tempfile" "$filename"

echo "Filtering complete. Lines containing 'space' have been removed from $filename."
