#!/usr/bin/python
import sys
import optparse
import fileinput


class Substring:
    def __init__(self, s):
        self.s = s
        self.occ = 0

    def  score(self):
        return (len(self.s) - 1) * (self.occ - 1) - 3

    def __str__(self):
        return u'{:3}: {:2} * "{}"'.format(self.score(), self.occ, self.s)


def get_free_chars(program):
    chars = [chr(i) for i in xrange(32, 127)] + [chr(i) for i in xrange(8, 31)]
    return filter(lambda i: i not in program and i not in u'"\'\\\r\n', chars)


def replace(program):
    chars = get_free_chars(program)
    used = ''

    while len(chars) > 0:
        # count substrings
        strings = {}
        for length in xrange(2, 20):
            for i in xrange(0, len(program) - length + 1):
                string = program[i:i + length]
                if string not in strings:
                    strings[string] = Substring(string)
                strings[string].occ += 1

        # get best
        best = reduce(lambda a, b: a if a.score() > b.score() else b, strings.itervalues(), Substring(''))
        if best.score() < 0:
            break
        sub = chars.pop(0)
        sys.stderr.write("replaced {:4} {}\n".format(repr(sub)[1:-1], best))
        used = sub + used
        program = program.replace(best.s, sub) + sub + best.s

    return program, used

parser = optparse.OptionParser(usage="usage: compress.py FILE'")
opts, files = parser.parse_args(sys.argv[1:])
inprogram = ''.join(fileinput.input(files))
inprogram = unicode(inprogram.strip(), "utf-8")

free_chars = get_free_chars(inprogram)
sys.stderr.write('free chars: {}\n'.format(''.join(map(lambda i: repr(i)[1:-1], free_chars))))
sys.stderr.write('input size: {:d}\n'.format(len(inprogram) - 1))
program, chars = replace(inprogram)
program = u'f="{0}";for(i in g="{1}")with(f.split(g[i]))f=join(pop(C=h=[]));with(a)with(Math)eval(f)'.format(program, chars)
program = program.encode("utf-8")

sys.stderr.write('compressed size: {}\n'.format(len(program)))

sys.stdout.write(program)
