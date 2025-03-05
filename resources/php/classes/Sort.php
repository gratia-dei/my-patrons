<?php

class Sort
{
    private const CHARACTER_SORTED_BEFORE_OTHERS = '!';
    private const CHARACTER_SORTED_AFTER_OTHERS = 'ﻩ';

    public function getCharacterSortedBeforeOthers(): string {
        return self::CHARACTER_SORTED_BEFORE_OTHERS;
    }

    public function getCharacterSortedAfterOthers(): string {
        return self::CHARACTER_SORTED_AFTER_OTHERS;
    }

    public function getSortedListByKeys(array $list): array
    {
        $result = [];

        foreach ($list as $key => $value) {
            $newKey = $this->normalizeDiacriticalCharacters($key, true);

            $result[$newKey] = $value;
        }
        ksort($result, SORT_NATURAL);

        return $result;
    }

    public function normalizeDiacriticalCharacters($string, $isCharacterForSortAdded = false) {
        if (!preg_match('/[\x80-\xff]/', $string)) {
            return $string;
        }

        if ($this->isSeemsLikeUtf8($string)) {
            $chars = [
                // Decompositions for Latin-1 Supplement
                chr(195).chr(128) => 'A',
                chr(195).chr(129) => 'A',
                chr(195).chr(130) => 'A',
                chr(195).chr(131) => 'A',
                chr(195).chr(132) => 'A',
                chr(195).chr(133) => 'A',
                chr(195).chr(135) => 'C',
                chr(195).chr(136) => 'E',
                chr(195).chr(137) => 'E',
                chr(195).chr(138) => 'E',
                chr(195).chr(139) => 'E',
                chr(195).chr(140) => 'I',
                chr(195).chr(141) => 'I',
                chr(195).chr(142) => 'I',
                chr(195).chr(143) => 'I',
                chr(195).chr(145) => 'N',
                chr(195).chr(146) => 'O',
                chr(195).chr(147) => 'O',
                chr(195).chr(148) => 'O',
                chr(195).chr(149) => 'O',
                chr(195).chr(150) => 'O',
                chr(195).chr(153) => 'U',
                chr(195).chr(154) => 'U',
                chr(195).chr(155) => 'U',
                chr(195).chr(156) => 'U',
                chr(195).chr(157) => 'Y',
                chr(195).chr(159) => 's',
                chr(195).chr(160) => 'a',
                chr(195).chr(161) => 'a',
                chr(195).chr(162) => 'a',
                chr(195).chr(163) => 'a',
                chr(195).chr(164) => 'a',
                chr(195).chr(165) => 'a',
                chr(195).chr(167) => 'c',
                chr(195).chr(168) => 'e',
                chr(195).chr(169) => 'e',
                chr(195).chr(170) => 'e',
                chr(195).chr(171) => 'e',
                chr(195).chr(172) => 'i',
                chr(195).chr(173) => 'i',
                chr(195).chr(174) => 'i',
                chr(195).chr(175) => 'i',
                chr(195).chr(177) => 'n',
                chr(195).chr(178) => 'o',
                chr(195).chr(179) => 'o',
                chr(195).chr(180) => 'o',
                chr(195).chr(181) => 'o',
                chr(195).chr(182) => 'o',
                chr(195).chr(182) => 'o',
                chr(195).chr(185) => 'u',
                chr(195).chr(184) => 'o',
                chr(195).chr(186) => 'u',
                chr(195).chr(187) => 'u',
                chr(195).chr(188) => 'u',
                chr(195).chr(189) => 'y',
                chr(195).chr(191) => 'y',
                // Decompositions for Latin Extended-A
                chr(196).chr(128) => 'A',
                chr(196).chr(129) => 'a',
                chr(196).chr(130) => 'A',
                chr(196).chr(131) => 'a',
                chr(196).chr(132) => 'A',
                chr(196).chr(133) => 'a',
                chr(196).chr(134) => 'C',
                chr(196).chr(135) => 'c',
                chr(196).chr(136) => 'C',
                chr(196).chr(137) => 'c',
                chr(196).chr(138) => 'C',
                chr(196).chr(139) => 'c',
                chr(196).chr(140) => 'C',
                chr(196).chr(141) => 'c',
                chr(196).chr(142) => 'D',
                chr(196).chr(143) => 'd',
                chr(196).chr(144) => 'D',
                chr(196).chr(145) => 'd',
                chr(196).chr(146) => 'E',
                chr(196).chr(147) => 'e',
                chr(196).chr(148) => 'E',
                chr(196).chr(149) => 'e',
                chr(196).chr(150) => 'E',
                chr(196).chr(151) => 'e',
                chr(196).chr(152) => 'E',
                chr(196).chr(153) => 'e',
                chr(196).chr(154) => 'E',
                chr(196).chr(155) => 'e',
                chr(196).chr(156) => 'G',
                chr(196).chr(157) => 'g',
                chr(196).chr(158) => 'G',
                chr(196).chr(159) => 'g',
                chr(196).chr(160) => 'G',
                chr(196).chr(161) => 'g',
                chr(196).chr(162) => 'G',
                chr(196).chr(163) => 'g',
                chr(196).chr(164) => 'H',
                chr(196).chr(165) => 'h',
                chr(196).chr(166) => 'H',
                chr(196).chr(167) => 'h',
                chr(196).chr(168) => 'I',
                chr(196).chr(169) => 'i',
                chr(196).chr(170) => 'I',
                chr(196).chr(171) => 'i',
                chr(196).chr(172) => 'I',
                chr(196).chr(173) => 'i',
                chr(196).chr(174) => 'I',
                chr(196).chr(175) => 'i',
                chr(196).chr(176) => 'I',
                chr(196).chr(177) => 'i',
                chr(196).chr(178) => 'IJ',
                chr(196).chr(179) => 'ij',
                chr(196).chr(180) => 'J',
                chr(196).chr(181) => 'j',
                chr(196).chr(182) => 'K',
                chr(196).chr(183) => 'k',
                chr(196).chr(184) => 'k',
                chr(196).chr(185) => 'L',
                chr(196).chr(186) => 'l',
                chr(196).chr(187) => 'L',
                chr(196).chr(188) => 'l',
                chr(196).chr(189) => 'L',
                chr(196).chr(190) => 'l',
                chr(196).chr(191) => 'L',
                chr(197).chr(128) => 'l',
                chr(197).chr(129) => 'L',
                chr(197).chr(130) => 'l',
                chr(197).chr(131) => 'N',
                chr(197).chr(132) => 'n',
                chr(197).chr(133) => 'N',
                chr(197).chr(134) => 'n',
                chr(197).chr(135) => 'N',
                chr(197).chr(136) => 'n',
                chr(197).chr(137) => 'N',
                chr(197).chr(138) => 'n',
                chr(197).chr(139) => 'N',
                chr(197).chr(140) => 'O',
                chr(197).chr(141) => 'o',
                chr(197).chr(142) => 'O',
                chr(197).chr(143) => 'o',
                chr(197).chr(144) => 'O',
                chr(197).chr(145) => 'o',
                chr(197).chr(146) => 'OE',
                chr(197).chr(147) => 'oe',
                chr(197).chr(148) => 'R',
                chr(197).chr(149) => 'r',
                chr(197).chr(150) => 'R',
                chr(197).chr(151) => 'r',
                chr(197).chr(152) => 'R',
                chr(197).chr(153) => 'r',
                chr(197).chr(154) => 'S',
                chr(197).chr(155) => 's',
                chr(197).chr(156) => 'S',
                chr(197).chr(157) => 's',
                chr(197).chr(158) => 'S',
                chr(197).chr(159) => 's',
                chr(197).chr(160) => 'S',
                chr(197).chr(161) => 's',
                chr(197).chr(162) => 'T',
                chr(197).chr(163) => 't',
                chr(197).chr(164) => 'T',
                chr(197).chr(165) => 't',
                chr(197).chr(166) => 'T',
                chr(197).chr(167) => 't',
                chr(197).chr(168) => 'U',
                chr(197).chr(169) => 'u',
                chr(197).chr(170) => 'U',
                chr(197).chr(171) => 'u',
                chr(197).chr(172) => 'U',
                chr(197).chr(173) => 'u',
                chr(197).chr(174) => 'U',
                chr(197).chr(175) => 'u',
                chr(197).chr(176) => 'U',
                chr(197).chr(177) => 'u',
                chr(197).chr(178) => 'U',
                chr(197).chr(179) => 'u',
                chr(197).chr(180) => 'W',
                chr(197).chr(181) => 'w',
                chr(197).chr(182) => 'Y',
                chr(197).chr(183) => 'y',
                chr(197).chr(184) => 'Y',
                chr(197).chr(185) => 'Z',
                chr(197).chr(186) => 'z',
                chr(197).chr(187) => 'Z',
                chr(197).chr(188) => 'z',
                chr(197).chr(189) => 'Z',
                chr(197).chr(190) => 'z',
                chr(197).chr(191) => 's',
                // Euro Sign
                chr(226).chr(130).chr(172) => 'E',
                // GBP (Pound) Sign
                chr(194).chr(163) => 'L',           //in original function was empty value ''
            ];
        } else {
            $chars = [
                chr(128) => 'E',
                chr(131) => 'f',
                chr(138) => 'S',
                chr(142) => 'Z',
                chr(154) => 's',
                chr(158) => 'z',
                chr(159) => 'Y',
                chr(162) => 'c',
                chr(165) => 'Y',
                chr(181) => 'u',
                chr(192) => 'A',
                chr(193) => 'A',
                chr(194) => 'A',
                chr(195) => 'A',
                chr(196) => 'A',
                chr(197) => 'A',
                chr(199) => 'C',
                chr(200) => 'E',
                chr(201) => 'E',
                chr(202) => 'E',
                chr(203) => 'E',
                chr(204) => 'I',
                chr(205) => 'I',
                chr(206) => 'I',
                chr(207) => 'I',
                chr(209) => 'N',
                chr(210) => 'O',
                chr(211) => 'O',
                chr(212) => 'O',
                chr(213) => 'O',
                chr(214) => 'O',
                chr(216) => 'O',
                chr(217) => 'U',
                chr(218) => 'U',
                chr(219) => 'U',
                chr(220) => 'U',
                chr(221) => 'Y',
                chr(224) => 'a',
                chr(225) => 'a',
                chr(226) => 'a',
                chr(227) => 'a',
                chr(228) => 'a',
                chr(229) => 'a',
                chr(231) => 'c',
                chr(232) => 'e',
                chr(233) => 'e',
                chr(234) => 'e',
                chr(235) => 'e',
                chr(236) => 'i',
                chr(237) => 'i',
                chr(238) => 'i',
                chr(239) => 'i',
                chr(241) => 'n',
                chr(242) => 'o',
                chr(243) => 'o',
                chr(244) => 'o',
                chr(245) => 'o',
                chr(246) => 'o',
                chr(248) => 'o',
                chr(249) => 'u',
                chr(250) => 'u',
                chr(251) => 'u',
                chr(252) => 'u',
                chr(253) => 'y',
                chr(255) => 'y',

                chr(140) => 'OE',
                chr(156) => 'oe',
                chr(198) => 'AE',
                chr(208) => 'DH',
                chr(222) => 'TH',
                chr(223) => 'ss',
                chr(230) => 'ae',
                chr(240) => 'dh',
                chr(254) => 'th',
            ];
        }

        if ($isCharacterForSortAdded) {
            foreach ($chars as $key => $value) {
                if (strlen($value) < 2) {
                    $chars[$key] = $value . $this->getCharacterSortedAfterOthers();
                }
            }
        }

        $string = strtr($string, $chars);

        return $string;
    }

    private function isSeemsLikeUtf8($str)
    {
        $length = strlen($str);
        for ($i=0; $i < $length; $i++) {
            $c = ord($str[$i]);
            if ($c < 0x80) $n = 0; # 0bbbbbbb
            elseif (($c & 0xE0) == 0xC0) $n = 1; # 110bbbbb
            elseif (($c & 0xF0) == 0xE0) $n = 2; # 1110bbbb
            elseif (($c & 0xF8) == 0xF0) $n = 3; # 11110bbb
            elseif (($c & 0xFC) == 0xF8) $n = 4; # 111110bb
            elseif (($c & 0xFE) == 0xFC) $n = 5; # 1111110b
            else return false; # Does not match any model
            for ($j=0; $j<$n; $j++) { # n bytes matching 10bbbbbb follow ?
                if ((++$i == $length) || ((ord($str[$i]) & 0xC0) != 0x80)) {
                    return false;
                }
            }
        }
        return true;
    }
}
