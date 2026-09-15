#!/bin/bash

echo "Starting tests for all Collaborative Learning Java codes..."
echo "========================================================="

for d in question_*; do
    echo "--- Testing $d ---"
    cd "$d"
    
    # Find the java file
    java_file=$(ls *.java)
    class_name=$(basename "$java_file" .java)
    
    echo "Compiling $java_file..."
    javac "$java_file"
    
    echo "Running $class_name:"
    java "$class_name"
    
    echo ""
    cd ..
done

echo "========================================================="
echo "All tests completed successfully!"
