#!/usr/bin/python
import sys
import re


def replace_vars(f, names):
    for old, new in names.iteritems():
        f = re.sub('(?<!\w|\.)%s(?=\W)' % old, new, f)
    return f


def remove_ws(f):
    g = ''
    instring = False
    for c in f:
        if c == "'":
            instring = not instring
        if re.match(r'\s', c) and not instring and not g.endswith('new'):
            continue
        g += c
    g = g.replace('in%s' % names['board'], ' in %s' % names['board'])
    return g

names = {
    # functions
    'drawArc': 'p',
    # variables
    'board': 'C',
    'pinkieX': 'H',
    'pinkieY': 'r',
    'dx': 'R',
    'dy': 'o',
    'moved': 'W',
    'track': 'h',
    'drawP': 'm',
    'active': 'n',
    'movedSnow': 'S',
    'sSource': 'w',
    'animStep': 'y',
    'sDest': 'z',
}

f = open(sys.argv[1]).read()

sys.stderr.write('input size                   : %d\n' % len(f))
# replace var names
f = replace_vars(f, names)
sys.stderr.write('size with short var names    : %d\n' % len(f))
# remove comments
f = re.sub(r'//.*?\n', '', f)
# remove whitespace
f = remove_ws(f)
sys.stderr.write('size after formatting        : %d\n' % len(f))

print f
