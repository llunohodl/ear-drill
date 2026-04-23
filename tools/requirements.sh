#!/usr/bin/env bash
# Just download all resources directly!
# Yep, there is no Yarn or NPM, simply because they are a source of mess for such a simple project.
# The old-fashioned way to get dependencies seems more suitable (at least for now).
#
set -e

rm -r vendor
mkdir -p vendor
cd vendor

## UI install
# AlphaTab to draw tabs and notes
wget https://registry.npmjs.org/@coderline/alphatab/-/alphatab-1.8.1.tgz
tar -xzf alphatab-1.8.1.tgz
mv package alphatab
# Pico css style
wget https://github.com/picocss/pico/archive/refs/heads/main.zip
unzip main.zip
mv pico-main pico

## Audio processing install
# Tone.js - Sound prosessing
wget https://registry.npmjs.org/tone/-/tone-15.1.22.tgz
tar -xzf tone-15.1.22.tgz
mv package tone
# mp3 samples for Tone.Sampler
wget https://github.com/nbrosowsky/tonejs-instruments/archive/refs/heads/master.zip
unzip master.zip 
find ./tonejs-instruments-master -type f -name *.wav -delete
find ./tonejs-instruments-master -type f -name *.ogg -delete
mkdir ../assets
mv tonejs-instruments/samples ../assets/samples
mv tonejs-instruments/Tonejs-Instruments.js .

# Cleanup
rm -rf tonejs-instruments-master
rm *.zip
rm *.tgz
