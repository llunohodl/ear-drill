#!/usr/bin/env bash
# Just download all resources directly!
# Yep, there is no Yarn or NPM, simply because they are a source of mess for such a simple project.
# The old-fashioned way to get dependencies seems more suitable (at least for now).
#
set -e

rm -r vendor
mkdir -p vendor
cd vendor

wget https://registry.npmjs.org/@coderline/alphatab/-/alphatab-1.8.1.tgz
tar -xzf alphatab-1.8.1.tgz
mv package alphatab

wget https://registry.npmjs.org/tone/-/tone-15.1.22.tgz
tar -xzf tone-15.1.22.tgz
mv package tone

rm *.tgz

# Pico css
wget https://github.com/picocss/pico/archive/refs/heads/main.zip
unzip main.zip
mv pico-main pico

wget https://github.com/nbrosowsky/tonejs-instruments/archive/refs/heads/master.zip
unzip master.zip 
mv tonejs-instruments-master tonejs-instruments
find ./tonejs-instruments -type f -name *.wav -delete
find ./tonejs-instruments -type f -name *.ogg -delete

rm *.zip

mkdir ../assets
mv tonejs-instruments/samples ../assets/samples
mv tonejs-instruments/Tonejs-Instruments.js ..
rm -rf tonejs-instruments