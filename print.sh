#!/bin/sh

# get the current path
CURPATH=`pwd`

inotifywait -m --timefmt '%d/%m/%y %H:%M:%S' --format '%T %w %f' \
-e close_write ./uploads | while read date time dir file; do

     FILECHANGE=${dir}${file}
     # convert absolute path to relative
     FILECHANGEREL=`echo "$FILECHANGE" | sed 's_'$CURPATH'/__'`
     lp -o landscape -o fit-to-page -o media=A6 $FILECHANGEREL

     echo "At ${time} on ${date}, file $FILECHANGE was printed"
done
