/*
 |Размерность массива char M[9,10]
 |
 |Обозначения
 |
 |w - белая пешка(малая w)
 |W - белая выделенная(большая W)
 |q - белый генерал
 |Q - белый генерал выделенный
 |a - белая пешка под боем
 |A - белый генерал под боем
 |
 |b - черная пешка
 |B - Черная выделенная пешка
 |z - черный генерал
 |Z - черный выделенный генерал
 |c - черная пешка под боем 
 |C - Черный генерал под боем
 |
 |e - недоступное поле
 |x - возможное поле для хода
 |. - пустое поле|
 |
 |M[0,9] ==  состояние очеряднсти хода
 |0 - ход белых
 |1 - ход черных
 |
 |M[0,7] == y  координата выделенной фигуры 
 |M[0,8] == x  координата выделенной фигуры 
 |может быть от 0..9 или фигура не выделена n
 |
 |M[1,8] == 0..4 преимущество белых
 |M[1,9] == 0..4 преимущество черных 
 *
 * Главная функция класса - String Click(M, y, x), 
 * в функци Click передается поле с расположением фишек 
 * и координаты клетки на которую нажал игрок.
 * функция изменяет массив или не изменяет в зависимости от того какая фигура ходит,
 * и возвращает строку признака победы или "0"
 */



        //------------------НОРМАЛИЗАЦИЯ МАССИВА ----------------------------
                function NormalMass(M) // функция нормализации массива
                {
                    for (var iy = 0; iy < M.length; iy++)
                    {
                        for (var jx = 0; jx < M[0].length; jx++)
                        {
                            if (M[iy][jx] == 'x')
                                M[iy][jx] = '.';
                            else
                            {
                                if (M[iy][jx] == 'W')
                                    M[iy][jx] = 'w';
                                if (M[iy][jx] == 'B')
                                    M[iy][jx] = 'b';
                                if (M[iy][jx] == 'Q')
                                    M[iy][jx] = 'q';
                                if (M[iy][jx] == 'A')
                                    M[iy][jx] = 'q';
                                if (M[iy][jx] == 'a')
                                    M[iy][jx] = 'w';
                                if (M[iy][jx] == 'Z')
                                    M[iy][jx] = 'z';
                                if (M[iy][jx] == 'c')
                                    M[iy][jx] = 'b';
                                if (M[iy][jx] == 'C')
                                    M[iy][jx] = 'z';
                            }
                        }
                    }
                }
//**************** КОНЕЦ * НОРМАЛИЗАЦИИ МАССИВА *********************
        function Add(M, y, x, A)
        {
            if (PustoePole(M, y, x))
                M[y][x] = A;
        }
        function VMassive(M, y, x)
        {
            if (y > 8 || y < 0 || x > 9 || x < 0)
                return false;
            return true;
        }
        function VPole(M, y, x)
        {
            if (!VMassive(M, y, x))
                return false;
            if (y == 0)
                if (x > 5)
                    return false;
            if (y == 1)
                if (x > 6)
                    return false;
            if (y == 2)
                if (x > 7)
                    return false;
            if (y == 3)
                if (x > 8)
                    return false;
            if (y == 5)
                if (x < 1)
                    return false;
            if (y == 6)
                if (x < 2)
                    return false;
            if (y == 7)
                if (x < 3)
                    return false;
            if (y == 8)
                if (x < 4)
                    return false;
            return true;
        }
        function PustoePole(M, y, x)
        {
            if (!VMassive(M, y, x))
                return false;
            if (M[y][x] == '.' || M[y][x] == 'x')
                return true;
            return false;
        }
//----------------ХОД ГЕНЕРАЛ--------------------
        function General(M, y, x)
        {
            // ХОД ГЕНЕРАЛА
            if (M[y][x] == 'q' || M[y][x] == 'Q' || M[y][x] == 'Z' || M[y][x] == 'z')
            {
                Add(M, y - 2, x, 'x'); //1
                Add(M, y, x + 2, 'x'); //2
                Add(M, y + 2, x + 2, 'x'); //3
                Add(M, y + 2, x, 'x'); //4
                Add(M, y, x - 2, 'x'); //5
                Add(M, y - 2, x - 2, 'x'); //6    

                // БОЙ ГЕНЕРАЛА 
                if (ProvBoyGeneral(M, y, x, -1, -1))
                    VudelenieFiguruBoy(M, y - 1, x - 1); // проверяет ВОЗМОЖНОСТЬ ПОБИТЬ генералом и выделяет жертву
                if (ProvBoyGeneral(M, y, x, -1, 0))
                    VudelenieFiguruBoy(M, y - 1, x);
                if (ProvBoyGeneral(M, y, x, 0, 1))
                    VudelenieFiguruBoy(M, y, x + 1);
                if (ProvBoyGeneral(M, y, x, 1, 1))
                    VudelenieFiguruBoy(M, y + 1, x + 1);
                if (ProvBoyGeneral(M, y, x, 1, 0))
                    VudelenieFiguruBoy(M, y + 1, x);
                if (ProvBoyGeneral(M, y, x, 0, -1))
                    VudelenieFiguruBoy(M, y, x - 1);
            }
        }
//-----------------ПРОВЕРКА ВОЗМОЖНОСТИ ПОБИТЬ ГЕНЕРАЛУ------------------
        function ProvBoyGeneral(M, y, x, ky, kx)  // kx, ky это коэфициэнт
        {
            y = Number(y);
            x = Number(x);
            ky = Number(ky);
            kx = Number(kx);
            if (('q' == M[y][x] && VPole(M, y + ky, x + kx) && M[y + ky][x + kx] == 'b') || ('z' == M[y][x] && VPole(M, y + ky, x + kx) && M[y + ky][x + kx] == 'w')) // фигура противоположного цвета и не генерал
            {

                if (KolvoElemGeneral(M, y + ky, x + kx))
                {
                    if (Troyka(M, y, x))
                    {
                        if (ProverkaTroykaSamovos(M, y, x, y + ky, x + kx))
                            return false; // фигура не больше двух, в проверке на тройку не нуждается  
                    }
                    else
                        return true;
                }
            }

            return false;
        }
//----------------ХОД через 3 клетки + ход клюшкой малой и большой --------------------
        function Thrid(M, x, y)
        {
            y = Number(y);
            x = Number(x);
            if (PustoePole(M, x - 1, y - 1))   // 1 - верх (проверка допустимых клеток)
            {
                if (PustoePole(M, x - 1, y - 2))
                    Add(M, x - 1, y - 3, 'x'); // ход клюшкой 2b
                if (PustoePole(M, x - 2, y - 2))
                {
                    Add(M, x - 2, y - 3, 'x'); // ход клюшкой 1a
                    if (PustoePole(M, x - 2, y - 3))
                        Add(M, x - 2, y - 4, 'x'); // через лево
                }
            }
            if (PustoePole(M, x, y - 1))
            {
                if (PustoePole(M, x - 1, y - 2))
                    Add(M, x - 2, y - 3, 'x'); // ход клюшкой 1b
                if (PustoePole(M, x, y - 2))
                {
                    Add(M, x - 1, y - 3, 'x'); // ход клюшкой 2a
                    if (PustoePole(M, x - 1, y - 3))
                        Add(M, x - 2, y - 4, 'x'); //через право
                }
            }
            //----------------------------------------------------------------
            if (PustoePole(M, x, y - 1))   // 2 - верх-право (проверка допустимых клеток) // через верх
            {
                if (PustoePole(M, x + 1, y - 1))
                    Add(M, x + 2, y - 1, 'x'); // ход клюшкой 4b
                if (PustoePole(M, x, y - 2))
                {
                    Add(M, x + 1, y - 2, 'x'); // ход клюшкой 3a
                    if (PustoePole(M, x + 1, y - 2))
                        Add(M, x + 2, y - 2, 'x');
                }
            }
            if (PustoePole(M, x + 1, y))  //через низ
            {
                if (PustoePole(M, x + 1, y - 1))
                    Add(M, x + 1, y - 2, 'x'); // ход клюшкой 3b
                if (PustoePole(M, x + 2, y))
                {
                    Add(M, x + 2, y - 1, 'x'); // ход клюшкой 4a
                    if (PustoePole(M, x + 2, y - 1))
                        Add(M, x + 2, y - 2, 'x');
                }
            }
            //----------------------------------------------------------------
            if (PustoePole(M, x + 1, y))   // 3 - низ-право (проверка допустимых клеток)
            {
                if (PustoePole(M, x + 2, y + 1))
                    Add(M, x + 3, y + 2, 'x'); // ход клюшкой 6b
                if (PustoePole(M, x + 2, y))
                {
                    Add(M, x + 3, y + 1, 'x'); // ход клюшкой 5a
                    if (PustoePole(M, x + 3, y + 1))
                        Add(M, x + 4, y + 2, 'x'); // через верх
                }
            }
            if (PustoePole(M, x + 1, y + 1))
            {
                if (PustoePole(M, x + 2, y + 1))
                    Add(M, x + 3, y + 1, 'x'); // ход клюшкой 5b
                if (PustoePole(M, x + 2, y + 2))
                {
                    Add(M, x + 3, y + 2, 'x'); // ход клюшкой 6a
                    if (PustoePole(M, x + 3, y + 2))
                        Add(M, x + 4, y + 2, 'x'); //через низ
                }
            }
            //----------------------------------------------------------------            
            if (PustoePole(M, x + 1, y + 1))   // 4 - низ(проверка допустимых клеток)
            {
                if (PustoePole(M, x + 1, y + 2))
                    Add(M, x + 1, y + 3, 'x'); // ход клюшкой 8b
                if (PustoePole(M, x + 2, y + 2))
                {
                    Add(M, x + 2, y + 3, 'x'); // ход клюшкой 7a
                    if (PustoePole(M, x + 2, y + 3))
                        Add(M, x + 2, y + 4, 'x'); // через право
                }
            }
            if (PustoePole(M, x, y + 1))
            {
                if (PustoePole(M, x + 1, y + 2))
                    Add(M, x + 2, y + 3, 'x'); // ход клюшкой 7b
                if (PustoePole(M, x, y + 2))
                {
                    Add(M, x + 1, y + 3, 'x'); // ход клюшкой 8a
                    if (PustoePole(M, x + 1, y + 3))
                        Add(M, x + 2, y + 4, 'x'); //через лево
                }
            }
            //----------------------------------------------------------------            
            if (PustoePole(M, x, y + 1))  // 5 - низ-лево (проверка допустимых клеток)
            {
                if (PustoePole(M, x - 1, y + 1))
                    Add(M, x - 2, y + 1, 'x'); // ход клюшкой 10b 
                if (PustoePole(M, x, y + 2))
                {
                    Add(M, x - 1, y + 2, 'x'); // ход клюшкой 9a
                    if (PustoePole(M, x - 1, y + 2))
                        Add(M, x - 2, y + 2, 'x'); //через верх
                }
            }
            if (PustoePole(M, x - 1, y))
            {
                if (PustoePole(M, x - 1, y + 1))
                    Add(M, x - 1, y + 2, 'x'); // ход клюшкой 9b
                if (PustoePole(M, x - 2, y))
                {
                    Add(M, x - 2, y + 1, 'x'); // ход клюшкой 10a
                    if (PustoePole(M, x - 2, y + 1))
                        Add(M, x - 2, y + 2, 'x'); // через низ
                }
            }
            //--------------------------------------------------------------
            if (PustoePole(M, x - 1, y - 1))   // 6 - верх-лево (проверка допустимых клеток)
            {
                if (PustoePole(M, x - 2, y - 1))
                    Add(M, x - 3, y - 1, 'x'); // ход клюшкой 11b
                if (PustoePole(M, x - 2, y - 2))
                {
                    Add(M, x - 3, y - 1, 'x'); // ход клюшкой 11a
                    if (PustoePole(M, x - 3, y - 2))
                        Add(M, x - 4, y - 2, 'x'); // через верх
                }
            }
            if (PustoePole(M, x - 1, y))
            {
                if (PustoePole(M, x - 2, y - 1))
                    Add(M, x - 3, y - 2, 'x'); // ход клюшкой 12b
                if (PustoePole(M, x - 2, y))
                {
                    Add(M, x - 3, y - 2, 'x'); // ход клюшкой 12a
                    if (PustoePole(M, x - 3, y - 1))
                        Add(M, x - 4, y - 2, 'x'); //через низ
                }
            }
            //------------------------------------------------------------ 
        }
//----------------ХОД ПО ГОРИЗОНТАЛИ И ПО КОСОЙ + ХОД УГЛОМ --------------------
        function Four(M, y, x)
        {
            var ix = x - 1, iy = y - 1; // в левый верхний
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                var zx = ix + 1, zy = iy - 1; // ход углом  в верх-право
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                    zx++;
                }
                zx = ix - 1;
                zy = iy + 1; // ход углом  в низ-лево
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                    zx--;
                }
                ix--;
                iy--;
            }
            ix = x - 2; // в левый верхний по косой
            iy = y - 1;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix, zy = iy - 1; // ход углом  в верх-право по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                }
                zx = ix;
                zy = iy + 1; // ход углом  в низ-лево по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                }
                ix -= 2;
                iy--;
            }
            ix = x + 1; // в правый нижний
            iy = y + 1;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix + 1, zy = iy - 1; // ход углом  в верх-право
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                    zx++;
                }
                zx = ix - 1;
                zy = iy + 1; // ход углом  в низ-лево
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                    zx--;
                }
                ix++;
                iy++;
            }
            ix = x - 1; // в левый нижний по косой
            iy = y + 1;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix - 1, zy = iy - 1; // ход углом  в верх-лево по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                    zx--;
                }
                zx = ix + 1;
                zy = iy + 1; // ход углом  в низ-лево по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                    zx++;
                }
                ix--;
                iy++;
            }
            ix = x; // в левый верхний
            iy = y - 1;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix - 2, zy = iy - 1; // ход углом  в верх-лево по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                    zx -= 2;
                }
                zx = ix + 2;
                zy = iy + 1; // ход углом  в низ-лево по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                    zx += 2;
                }

                iy--;
            }
            ix = x + 1; // в правый верхний по косой
            iy = y - 1;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix - 1, zy = iy - 1; // ход углом  в верх-право
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                    zx--;
                }
                zx = ix + 1;
                zy = iy + 1; // ход углом  в низ-лево
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                    zx++;
                }
                ix++;
                iy--;
            }
            ix = x; // в правый верхний
            iy = y + 1;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix - 2, zy = iy - 1; // ход углом  в верх-лево по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                    zx -= 2;
                }
                zx = ix + 2;
                zy = iy + 1; // ход углом  в низ-лево по косой
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                    zx += 2;
                }
                iy++;
            }
            ix = x + 2; // в правый нижний по косой
            iy = y + 1;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix, zy = iy - 1; // ход углом  в верх-право
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy--;
                }
                zx = ix;
                zy = iy + 1; // ход углом  в низ-лево
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy++;
                }
                ix += 2;
                iy++;
            }
        }
//------ПО ГОРИЗОНТАЛЯМ + ПОД ПРЯМЫМ УГЛОМ-----------------------------------
        function Fifth(M, y, x)
        {
            var ix = x - 1, iy = y; // в лево
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                var zx = ix - 1, zy = iy - 2; // ход углом  в верх
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy = zy - 2;
                    zx--;
                }
                zx = ix + 1;
                zy = iy + 2; // ход углом  в низ
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy = zy + 2;
                    zx++;
                }
                ix--;
            }
            ix = x + 1; // в право            
            iy = y;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix - 1, zy = iy - 2; // ход углом  в верх
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy = zy - 2;
                    zx--;
                }
                zx = ix + 1;
                zy = iy + 2; // ход углом  в низ
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zy = zy + 2;
                    zx++;
                }
                ix++;
            }
            ix = x + 1; // в низ
            iy = y + 2;
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix + 1, zy = iy; // ход углом  в право 
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zx++;
                }
                zx = ix - 1;
                zy = iy; // ход углом  в лево 
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zx--;
                }
                iy = iy + 2;
                ix++;
            }
            ix = x - 1;
            iy = y - 2; // в верх
            while (PustoePole(M, iy, ix))
            {
                Add(M, iy, ix, 'x');
                zx = ix + 1, zy = iy; // ход углом  в право 
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zx++;
                }
                zx = ix - 1;
                zy = iy; // ход углом  в лево 
                while (PustoePole(M, zy, zx))
                {
                    Add(M, zy, zx, 'x');
                    zx--;
                }

                iy = iy - 2;
                ix--;
            }
        }
//******** КОНЕЦ  ПО ГОРИЗОНТАЛЯМ + ПОД ПРЯМЫМ УГЛОМ *********************
        function NewMass()
        {
            var _M = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
            for (var iy = 0; iy < _M.length; iy++)
            {
                for (var ix = 0; ix < _M[0].length; ix++)
                {
                    _M[iy][ix] = '.';
                    if (!VPole(_M, iy, ix))
                        _M[iy][ix] = ' ';
                }
            }
            _M[0][9] = '1';
            _M[0][7] = 'n'; // x
            _M[0][8] = 'n'; // y
            _M[1][8] = '0'; // Преимущество белых 
            _M[1][9] = '0'; // Преимущество черных
            return _M;
        }
//------------------ВЫДЕЛЕНИЕ ФИГУРЫ ----------------------------
        function VudelenieFiguru(M, y, x)
        {
            if (M[y][x] == 'w') {
                M[y][x] = 'W';
                return;
            }
            if (M[y][x] == 'b') {
                M[y][x] = 'B';
                return;
            }
            if (M[y][x] == 'q') {
                M[y][x] = 'Q';
                return;
            }
            if (M[y][x] == 'z') {
                M[y][x] = 'Z';
                return;
            }
        }
//-----------------ПРОВЕРКА ОДИНАКОВОСТИ ФИГУРЫ С УЧЕТОМ ГЕНЕРАЛА------------------
        function ProvOdinakov(M, y, x, ky, kx)  // kx, ky это коэфициэнт
        {
            y = Number(y);
            x = Number(x);
            ky = Number(ky);
            kx = Number(kx);
            if (VMassive(M, y + ky, x + kx) && VMassive(M, y, x))
            {
                if (
                        (M[Number(y) + Number(ky)][Number(x) + kx] == M[y][x]) || //фигура одинаковая

                        ((M[y][x] == 'w' || M[y][x] == 'q' || M[y][x] == 'a' || M[y][x] == 'A') && //фигура белая/под боем белая
                                (M[y + ky][x + kx] == 'w' || M[y + ky][x + kx] == 'q' || M[y + ky][x + kx] == 'a' || M[y + ky][x + kx] == 'A')) ||
                        ((M[y][x] == 'b' || M[y][x] == 'z' || M[y][x] == 'c' || M[y][x] == 'C') && //фигура черная/под боем черная
                                (M[y + ky][x + kx] == 'b' || M[y + ky][x + kx] == 'z' || M[y + ky][x + kx] == 'c' || M[y + ky][x + kx] == 'C'))

                        )
                    return true;
            }
            else
                return false;
            return false;
        }
//-----------------ПОИСК ТРОЙКИ/четверки --------------------------------
        function Troyka(M, y, x)
        {
            y = Number(y);
            x = Number(x);
            var temp_y = y, temp_x = x;
            var kolvo = 0; //количество элементов вокруг выбраной клетки

            //массив элементов частей тройки, размер 6(максимально возможное колво) на 2(координаты) 
            var mas_temp = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
            mas_temp[kolvo][0] = x;
            mas_temp[kolvo][1] = y; //сохранение координат первого элемента
            // сохраняем координаты остальных элементов, которые окружают его

            if (ProvOdinakov(M, y, x, -1, -1)) {
                kolvo++;
                mas_temp[kolvo][0] = x - 1;
                mas_temp[kolvo][1] = y - 1;
            }
            if (ProvOdinakov(M, y, x, -1, 0)) {
                kolvo++;
                mas_temp[kolvo][0] = x;
                mas_temp[kolvo][1] = y - 1;
            }
            if (ProvOdinakov(M, y, x, 0, 1)) {
                kolvo++;
                mas_temp[kolvo][0] = x + 1;
                mas_temp[kolvo][1] = y;
            }
            if (ProvOdinakov(M, y, x, 1, 1)) {
                kolvo++;
                mas_temp[kolvo][0] = x + 1;
                mas_temp[kolvo][1] = y + 1;
            }
            if (ProvOdinakov(M, y, x, 1, 0)) {
                kolvo++;
                mas_temp[kolvo][0] = x;
                mas_temp[kolvo][1] = y + 1;
            }
            if (ProvOdinakov(M, y, x, 0, -1)) {
                kolvo++;
                mas_temp[kolvo][0] = x - 1;
                mas_temp[kolvo][1] = y;
            }

            if (kolvo == 0 || kolvo > 2)
                return false; // не тройка, кличество фишек рядом не подходит
            if (mas_temp[2][0] == -1) // третий элемент не заполнен, находим его и заполняем
            {
                //берем второй элемент тройки и проверяем что вокруг
                kolvo = 0; //количество элементов вокруг выбраной клетки

                //!!!!!!!!!!! меняется передаваемые параметры!!!
                x = mas_temp[1][0]; // заносим в Х и У кординаты второго элемента
                y = mas_temp[1][1];
                // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                if (ProvOdinakov(M, y, x, -1, -1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1)) //если координаты не совпадают с первым элементом
                    {
                        mas_temp[2][0] = x - 1;
                        mas_temp[2][1] = y - 1;
                    }
                }
                if (ProvOdinakov(M, y, x, -1, 0))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x && mas_temp[0][1] == y - 1))
                    {
                        mas_temp[2][0] = x;
                        mas_temp[2][1] = y - 1;
                    }
                }
                if (ProvOdinakov(M, y, x, 0, 1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y))
                    {
                        mas_temp[2][0] = x + 1;
                        mas_temp[2][1] = y;
                    }
                }
                if (ProvOdinakov(M, y, x, 1, 1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1))
                    {
                        mas_temp[2][0] = x + 1;
                        mas_temp[2][1] = y + 1;
                    }
                }
                if (ProvOdinakov(M, y, x, 1, 0))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x && mas_temp[0][1] == y + 1))
                    {
                        mas_temp[2][0] = x;
                        mas_temp[2][1] = y + 1;
                    }
                }
                if (ProvOdinakov(M, y, x, 0, -1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y))
                    {
                        mas_temp[2][0] = x - 1;
                        mas_temp[2][1] = y;
                    }
                }

                if (kolvo == 0 || kolvo > 2)
                    return false; //  не тройка, вокруг больше или меньше элементов                               
            }
            //-------------------ТРОЙКА ИЛИ ЧЕТВЕРКА ИЛИ СКОПЛЕНИЕ
            if (mas_temp[2][0] != -1)
            {
                // проводим проверку остальных частей тройки что бы не было множества
                var proverka_na_mnozhestvo = 0;
                proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[0][1], mas_temp[0][0]);
                proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[1][1], mas_temp[1][0]);
                proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[2][1], mas_temp[2][0]);
                if (proverka_na_mnozhestvo != 4 && proverka_na_mnozhestvo != 5)
                    return false; //четверка или тройка иначе скопление 

//-*-*-*-*-*-*-*-*-*-*-*-*-*-ЧЕТВЕРКА или большое скопление

                if (proverka_na_mnozhestvo == 5)
                {
                    // проверяем третий элемент на соединение с 4м
                    kolvo = 0; //количество элементов вокруг выбраной клетки

                    //!!!!!!!!!!! меняется передаваемые параметры!!!
                    x = mas_temp[2][0]; // заносим в Х и У кординаты третьего элемента
                    y = mas_temp[2][1];
                    // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                    if (ProvOdinakov(M, y, x, -1, -1))
                    {
                        kolvo++;
                        if (//если координаты не совпадают с первым элементом и вторым
                                !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1) &&
                                !(mas_temp[1][0] == x - 1 && mas_temp[1][1] == y - 1)
                                )
                        {
                            mas_temp[3][0] = x - 1;
                            mas_temp[3][1] = y - 1;
                        } //заносим их в четвертый слот
                    }
                    if (ProvOdinakov(M, y, x, -1, 0))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x && mas_temp[0][1] == y - 1) &&
                                !(mas_temp[1][0] == x && mas_temp[1][1] == y - 1)
                                )
                        {
                            mas_temp[3][0] = x;
                            mas_temp[3][1] = y - 1;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 0, 1))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y) &&
                                !(mas_temp[1][0] == x + 1 && mas_temp[1][1] == y)
                                )
                        {
                            mas_temp[3][0] = x + 1;
                            mas_temp[3][1] = y;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 1, 1))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1) &&
                                !(mas_temp[1][0] == x + 1 && mas_temp[1][1] == y + 1)
                                )
                        {
                            mas_temp[3][0] = x + 1;
                            mas_temp[3][1] = y + 1;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 1, 0))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x && mas_temp[0][1] == y + 1) &&
                                !(mas_temp[1][0] == x && mas_temp[1][1] == y + 1)
                                )
                        {
                            mas_temp[3][0] = x;
                            mas_temp[3][1] = y + 1;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 0, -1))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y) &&
                                !(mas_temp[1][0] == x - 1 && mas_temp[1][1] == y)
                                )
                        {
                            mas_temp[3][0] = x - 1;
                            mas_temp[3][1] = y;
                        }
                    }

                    if (kolvo == 0 || kolvo > 2)
                        return false; //  не четверка, вокруг больше или меньше элементов 

                    //ПРОВЕРЯЕМ второй элемент на соединение с 4м
                    if (mas_temp[3][0] == -1) // четвертый элемент не заполнен, находим его и заполняем
                    {
                        //берем второй элемент тройки и проверяем что вокруг
                        kolvo = 0; //количество элементов вокруг выбраной клетки

                        //!!!!!!!!!!! меняется передаваемые параметры!!!
                        x = mas_temp[1][0]; // заносим в Х и У кординаты второго элемента
                        y = mas_temp[1][1];
                        // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                        if (ProvOdinakov(M, y, x, -1, -1))
                        {
                            kolvo++;
                            if (//если координаты не совпадают с первым элементом и вторым
                                    !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1) &&
                                    !(mas_temp[2][0] == x - 1 && mas_temp[2][1] == y - 1)
                                    )
                            {
                                mas_temp[3][0] = x - 1;
                                mas_temp[3][1] = y - 1;
                            } //заносим их в четвертый слот
                        }
                        if (ProvOdinakov(M, y, x, -1, 0))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x && mas_temp[0][1] == y - 1) &&
                                    !(mas_temp[2][0] == x && mas_temp[2][1] == y - 1)
                                    )
                            {
                                mas_temp[3][0] = x;
                                mas_temp[3][1] = y - 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, 1))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y) &&
                                    !(mas_temp[2][0] == x + 1 && mas_temp[2][1] == y)
                                    )
                            {
                                mas_temp[3][0] = x + 1;
                                mas_temp[3][1] = y;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 1))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1) &&
                                    !(mas_temp[2][0] == x + 1 && mas_temp[2][1] == y + 1)
                                    )
                            {
                                mas_temp[3][0] = x + 1;
                                mas_temp[3][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 0))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x && mas_temp[0][1] == y + 1) &&
                                    !(mas_temp[2][0] == x && mas_temp[2][1] == y + 1)
                                    )
                            {
                                mas_temp[3][0] = x;
                                mas_temp[3][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, -1))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y) &&
                                    !(mas_temp[2][0] == x - 1 && mas_temp[2][1] == y)
                                    )
                            {
                                mas_temp[3][0] = x - 1;
                                mas_temp[3][1] = y;
                            }
                        }

                        if (kolvo == 0 || kolvo > 2)
                            return false; //  не тройка, вокруг больше или меньше элементов                               
                    }
                    if (KolvoElem(M, mas_temp[3][1], mas_temp[3][0]) == 1)
                    {
                        //проверка на четверку по одинаковому У, варианты четверки 1,2,3,4
                        if (
                                mas_temp[0][1] == mas_temp[1][1] && //y1=y2=y3!=y4
                                mas_temp[0][1] == mas_temp[2][1] &&
                                mas_temp[0][1] != mas_temp[3][1]
                                ) {
                            return true;
                        }
                        if (
                                mas_temp[0][1] == mas_temp[1][1] && //y1=y2=y4!=y3
                                mas_temp[0][1] == mas_temp[3][1] &&
                                mas_temp[0][1] != mas_temp[2][1]
                                ) {
                            return true;
                        }
                        if (
                                mas_temp[0][1] == mas_temp[3][1] && //y1=y4=y3!=y2
                                mas_temp[0][1] == mas_temp[2][1] &&
                                mas_temp[0][1] != mas_temp[1][1]
                                ) {
                            return true;
                        }
                        if (
                                mas_temp[3][1] == mas_temp[1][1] && //y4=y2=y3!=y1
                                mas_temp[3][1] == mas_temp[2][1] &&
                                mas_temp[3][1] != mas_temp[0][1]
                                ) {
                            return true;
                        }

                        //проверка на четверку по одинаковому Х, варианты четверки 5,6,7,8
                        if (
                                mas_temp[0][0] == mas_temp[1][0] && //x1=x2=x3!=x4
                                mas_temp[0][0] == mas_temp[2][0] &&
                                mas_temp[0][0] != mas_temp[3][0]
                                ) {
                            return true;
                        }
                        if (
                                mas_temp[0][0] == mas_temp[1][0] && //x1=x2=x4!=x3
                                mas_temp[0][0] == mas_temp[3][0] &&
                                mas_temp[0][0] != mas_temp[2][0]
                                ) {
                            return true;
                        }
                        if (
                                mas_temp[0][0] == mas_temp[3][0] && //x1=x4=x3!=x2
                                mas_temp[0][0] == mas_temp[2][0] &&
                                mas_temp[0][0] != mas_temp[1][0]
                                ) {
                            return true;
                        }
                        if (
                                mas_temp[3][0] == mas_temp[1][0] && //x4=x2=x3!=x1
                                mas_temp[3][0] == mas_temp[2][0] &&
                                mas_temp[3][0] != mas_temp[0][0]
                                ) {
                            return true;
                        }

                        //проверка на четверку ни один Х не совпадает, варианты четверки 9,10
                        if (
                                (
                                        mas_temp[0][0] != mas_temp[1][0] && //x1!=x2!=x3!=x4
                                        mas_temp[0][0] != mas_temp[2][0] &&
                                        mas_temp[0][0] != mas_temp[3][0] &&
                                        mas_temp[1][0] != mas_temp[3][0] && //x2!=x3!=x4                            
                                        mas_temp[1][0] != mas_temp[2][0] &&
                                        mas_temp[2][0] != mas_temp[3][0]  //x3!=x4     
                                        ) &&
                                (// "У" по парно не совпадают
                                        (mas_temp[0][1] == mas_temp[1][1] && mas_temp[2][1] != mas_temp[3][1]) ||
                                        (mas_temp[0][1] == mas_temp[2][1] && mas_temp[1][1] != mas_temp[3][1]) ||
                                        (mas_temp[0][1] == mas_temp[3][1] && mas_temp[1][1] != mas_temp[3][1]) ||
                                        (mas_temp[1][1] == mas_temp[2][1] && mas_temp[0][1] != mas_temp[3][1]) ||
                                        (mas_temp[1][1] == mas_temp[3][1] && mas_temp[0][1] != mas_temp[2][1]) ||
                                        (mas_temp[2][1] == mas_temp[3][1] && mas_temp[0][1] != mas_temp[1][1])
                                        )
                                )
                        {
                            return true;
                        }

                        //проверка на четверку ни один У не совпадает, варианты четверки 11,12 лол
                        if (
                                (
                                        mas_temp[0][1] != mas_temp[1][1] && //у1!=у2!=у3!=у4
                                        mas_temp[0][1] != mas_temp[2][1] &&
                                        mas_temp[0][1] != mas_temp[3][1] &&
                                        mas_temp[1][1] != mas_temp[3][1] && //у2!=у3!=у4                            
                                        mas_temp[1][1] != mas_temp[2][1] &&
                                        mas_temp[2][1] != mas_temp[3][1]  //у3!=у4     
                                        ) &&
                                (// "Х" по парно не совпадают
                                        (mas_temp[0][0] == mas_temp[1][0] && mas_temp[2][1] != mas_temp[3][0]) ||
                                        (mas_temp[0][0] == mas_temp[2][0] && mas_temp[1][1] != mas_temp[3][0]) ||
                                        (mas_temp[0][0] == mas_temp[3][0] && mas_temp[1][1] != mas_temp[3][0]) ||
                                        (mas_temp[1][0] == mas_temp[2][0] && mas_temp[0][1] != mas_temp[3][0]) ||
                                        (mas_temp[1][0] == mas_temp[3][0] && mas_temp[0][1] != mas_temp[2][0]) ||
                                        (mas_temp[2][0] == mas_temp[3][0] && mas_temp[0][1] != mas_temp[1][0])
                                        )
                                )
                        {
                            return true;
                        }
                    }
                }

                //-*-*-*-*-*-*-*-*-*-*-*-*-*- 


                if (proverka_na_mnozhestvo != 4)
                    return false;
                if (// проверяем на нелинейность
                        (mas_temp[0][1] == mas_temp[1][1] && mas_temp[1][1] == mas_temp[2][1]) || //!=Y1==Y2==Y3
                        (mas_temp[0][0] == mas_temp[1][0] && mas_temp[1][0] == mas_temp[2][0]) //!=X1==X2==X3
                        )
                    return false; // тройная линия
                else
                {

                    var X = Array(mas_temp[0][0], mas_temp[1][0], mas_temp[2][0]);
                    for (var j = 0; j < 2; j++)
                    {
                        for (var i = 0; i < 2; i++)//сортировка занчений Х по возрастанию для проверки на линейность Х
                        {
                            if (X[i] > X[i + 1])
                                Swap(X, i);
                        }
                    }
                    if (X[0] + 1 == X[1] && X[1] == X[2] - 1)   // тройная линия 
                    {
                        if (mas_temp[0][1] == mas_temp[1][1] || mas_temp[2][1] == mas_temp[1][1] || mas_temp[0][1] == mas_temp[2][1])
                        {
                            return true;
                        }
                        else
                            return false;
                    }
                    else {
                        return true;
                    } //-----НАЙДЕНА ТРОЙКА----------
                }
            }
            return false;
        }
//-------------SWAP------------------------------------------------------------
        function Swap(X, i)
        {
            var temp = X[i];
            X[i] = X[i + 1];
            X[i + 1] = temp;
        }
//----------ВОЗМОЖНЫЕ ХОДЫ ТРОЙКИ---------------------------------------------
        function MovTroyka(M, y, x)
        {
            BoyTroyka(M, y, x, -1, -1); // в лево
            BoyTroyka(M, y, x, -1, 0); // в право
            BoyTroyka(M, y, x, 0, 1); // в левый верхний
            BoyTroyka(M, y, x, 1, 1); // в правый верхний
            BoyTroyka(M, y, x, 1, 0); // в левый нижний
            BoyTroyka(M, y, x, 0, -1); // в правый нижний            
        }
        function BoyTroyka(M, y, x, ky, kx)
        {
            var kx_protiv = 0, ky_protiv = 0; //противоположный коэфициэнт направления, для определения сильного звена

            if (kx == -1)
                kx_protiv = 1;
            else if (kx == 1)
                kx_protiv = -1;
            if (ky == -1)
                ky_protiv = 1;
            else if (ky == 1)
                ky_protiv = -1;
            var ix = x + kx, iy = y + ky;
            while (PustoePole(M, iy, ix))
            {
                ix = ix + kx;
                iy = iy + ky;
            }
            if (Vrag(M, y, x, iy, ix))
            {                           // проверка на самовостановление
                if (!Troyka(M, iy, ix))
                {
                    if (!ProverkaTroykaSamovos(M, y, x, iy, ix)) //проверка на самовостановление
                        VudelenieFiguruBoy(M, iy, ix); //если бьет не тройку
                }
                else
                {
                    if (!ProvOdinakov(M, iy, ix, ky, kx))     // если бьет не сильное звено
                    {
                        if (ProvOdinakov(M, y, x, ky_protiv, kx_protiv))      // если бьет сильным звеном  
                        {
                            if (!ProverkaTroykaSamovos(M, y, x, iy, ix))
                                VudelenieFiguruBoy(M, iy, ix);
                        }
                    }
                }
            }
        }
//---------------------ПРОВЕРКА НА САМОВОСТАНОВЛЕНИЕ ТРОЙКИ и Четверки-----------------------------------
        function ProverkaTroykaSamovos(M, y, x, iy, ix)
        {
            y = Number(y);
            x = Number(x);
            iy = Number(iy);
            ix = Number(ix);
            var COPY_M = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]; //создаем копию массива для проверки на скопление после хода
            for (var i = 0; i < COPY_M.length; i++)
                for (var j = 0; j < COPY_M[0].length; j++)
                    COPY_M[i][j] = M[i][j];
            //ходим в указаное место
            var tmp_ = COPY_M[y][x];
            COPY_M[iy][ix] = tmp_; //замена побитой фишки или становление ее на пустое место
            COPY_M[y][x] = '.'; //на место походившей устанавливаем пустое поле
            if (!Troyka(COPY_M, iy, ix))//если скопление то false
            {
                return false;
            }
            else //проверка главного массива на троку(НЕ ЧЕТВЕРКУ) и на четверку(НЕ ТРОЙКУ)
            {
                if (OnlyTroyka(M, y, x)) //тройка не должна стать четверкой
                {

                    var tmp_y = y;
                    var tmp_x = x;
                    //создаем пустой массив для проверки тройки 
                    temp = [
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
                    ];
                    //находим все координаты тройки
                    var kolvo = 0; //количество элементов вокруг выбраной клетки

                    //массив элементов частей тройки, размер 6(максимально возможное колво) на 2(координаты) 
                    var mas_temp = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
                    mas_temp[kolvo][0] = x;
                    mas_temp[kolvo][1] = y; //сохранение координат первого элемента
                    // сохраняем координаты остальных элементов, которые окружают его

                    if (ProvOdinakov(M, y, x, -1, -1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x - 1;
                        mas_temp[kolvo][1] = y - 1;
                    }
                    if (ProvOdinakov(M, y, x, -1, 0)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x;
                        mas_temp[kolvo][1] = y - 1;
                    }
                    if (ProvOdinakov(M, y, x, 0, 1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x + 1;
                        mas_temp[kolvo][1] = y;
                    }
                    if (ProvOdinakov(M, y, x, 1, 1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x + 1;
                        mas_temp[kolvo][1] = y + 1;
                    }
                    if (ProvOdinakov(M, y, x, 1, 0)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x;
                        mas_temp[kolvo][1] = y + 1;
                    }
                    if (ProvOdinakov(M, y, x, 0, -1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x - 1;
                        mas_temp[kolvo][1] = y;
                    }

                    if (mas_temp[2][0] == -1) // третий элемент не заполнен, находим его и заполняем
                    {
                        //берем второй элемент тройки и проверяем что вокруг
                        kolvo = 0; //количество элементов вокруг выбраной клетки

                        x = mas_temp[1][0]; // заносим в Х и У кординаты второго элемента
                        y = mas_temp[1][1];
                        // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                        if (ProvOdinakov(M, y, x, -1, -1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1)) //если координаты не совпадают с первым элементом
                            {
                                mas_temp[2][0] = x - 1;
                                mas_temp[2][1] = y - 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, -1, 0))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x && mas_temp[0][1] == y - 1))
                            {
                                mas_temp[2][0] = x;
                                mas_temp[2][1] = y - 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, 1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y))
                            {
                                mas_temp[2][0] = x + 1;
                                mas_temp[2][1] = y;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1))
                            {
                                mas_temp[2][0] = x + 1;
                                mas_temp[2][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 0))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x && mas_temp[0][1] == y + 1))
                            {
                                mas_temp[2][0] = x;
                                mas_temp[2][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, -1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y))
                            {
                                mas_temp[2][0] = x - 1;
                                mas_temp[2][1] = y;
                            }
                        }
                    }

                    //------все координаты тройки найдены, заносим их в временный массив
                    var proverka_na_mnozhestvo = 0;
                    proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[0][1], mas_temp[0][0]);
                    proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[1][1], mas_temp[1][0]);
                    proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[2][1], mas_temp[2][0]);
                    if (proverka_na_mnozhestvo == 4) //тройка 
                    {
                        Add(temp, mas_temp[0][1], mas_temp[0][0], 'w');
                        Add(temp, mas_temp[1][1], mas_temp[1][0], 'w');
                        Add(temp, mas_temp[2][1], mas_temp[2][0], 'w');
                        //------делаем ход
                        var tmp = temp[tmp_y, tmp_x];
                        temp[iy][ix] = tmp; //замена побитой фишки или становление ее на пустое место
                        temp[tmp_y, tmp_x] = '.'; //на место походившей устанавливаем пустое поле

                        if (!OnlyTroyka(temp, iy, ix))
                            return false; //проверка стала ли после хода тройка тройкой
                        else {
                            return true;
                        }//самовостановление
                    }
                    else // иначе это четверка и она не интересна нам
                    {
                        return false;
                    }

                }
                else //если четверка
                {
                    tmp_y = y;
                    tmp_x = x;
                    //создаем пустой массив для проверки тройки 
                    var temp = [
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
                    ];
                    //находим все координаты тройки
                    kolvo = 0; //количество элементов вокруг выбраной клетки

                    //массив элементов частей тройки, размер 6(максимально возможное колво) на 2(координаты) 
                    var mas_temp = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
                    mas_temp[kolvo][0] = x;
                    mas_temp[kolvo][1] = y; //сохранение координат первого элемента
                    // сохраняем координаты остальных элементов, которые окружают его

                    if (ProvOdinakov(M, y, x, -1, -1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x - 1;
                        mas_temp[kolvo][1] = y - 1;
                    }
                    if (ProvOdinakov(M, y, x, -1, 0)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x;
                        mas_temp[kolvo][1] = y - 1;
                    }
                    if (ProvOdinakov(M, y, x, 0, 1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x + 1;
                        mas_temp[kolvo][1] = y;
                    }
                    if (ProvOdinakov(M, y, x, 1, 1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x + 1;
                        mas_temp[kolvo][1] = y + 1;
                    }
                    if (ProvOdinakov(M, y, x, 1, 0)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x;
                        mas_temp[kolvo][1] = y + 1;
                    }
                    if (ProvOdinakov(M, y, x, 0, -1)) {
                        kolvo++;
                        mas_temp[kolvo][0] = x - 1;
                        mas_temp[kolvo][1] = y;
                    }

                    if (mas_temp[2][0] == -1) // третий элемент не заполнен, находим его и заполняем
                    {
                        //берем второй элемент тройки и проверяем что вокруг
                        kolvo = 0; //количество элементов вокруг выбраной клетки

                        x = mas_temp[1][0]; // заносим в Х и У кординаты второго элемента
                        y = mas_temp[1][1];
                        // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                        if (ProvOdinakov(M, y, x, -1, -1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1)) //если координаты не совпадают с первым элементом
                            {
                                mas_temp[2][0] = x - 1;
                                mas_temp[2][1] = y - 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, -1, 0))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x && mas_temp[0][1] == y - 1))
                            {
                                mas_temp[2][0] = x;
                                mas_temp[2][1] = y - 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, 1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y))
                            {
                                mas_temp[2][0] = x + 1;
                                mas_temp[2][1] = y;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1))
                            {
                                mas_temp[2][0] = x + 1;
                                mas_temp[2][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 0))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x && mas_temp[0][1] == y + 1))
                            {
                                mas_temp[2][0] = x;
                                mas_temp[2][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, -1))
                        {
                            kolvo++;
                            if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y))
                            {
                                mas_temp[2][0] = x - 1;
                                mas_temp[2][1] = y;
                            }
                        }
                    }

                    //------все координаты тройки найдены, заносим их в временный массив
                    proverka_na_mnozhestvo = 0;
                    proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[0][1], mas_temp[0][0]);
                    proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[1][1], mas_temp[1][0]);
                    proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[2][1], mas_temp[2][0]);
                    // находим остальные элементы

                    // проверяем третий элемент на соединение с 4м
                    kolvo = 0; //количество элементов вокруг выбраной клетки

                    //!!!!!!!!!!! меняется передаваемые параметры!!!
                    x = mas_temp[2][0]; // заносим в Х и У кординаты третьего элемента
                    y = mas_temp[2][1];
                    // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                    if (ProvOdinakov(M, y, x, -1, -1))
                    {
                        kolvo++;
                        if (//если координаты не совпадают с первым элементом и вторым
                                !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1) &&
                                !(mas_temp[1][0] == x - 1 && mas_temp[1][1] == y - 1)
                                )
                        {
                            mas_temp[3][0] = x - 1;
                            mas_temp[3][1] = y - 1;
                        } //заносим их в четвертый слот
                    }
                    if (ProvOdinakov(M, y, x, -1, 0))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x && mas_temp[0][1] == y - 1) &&
                                !(mas_temp[1][0] == x && mas_temp[1][1] == y - 1)
                                )
                        {
                            mas_temp[3][0] = x;
                            mas_temp[3][1] = y - 1;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 0, 1))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y) &&
                                !(mas_temp[1][0] == x + 1 && mas_temp[1][1] == y)
                                )
                        {
                            mas_temp[3][0] = x + 1;
                            mas_temp[3][1] = y;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 1, 1))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1) &&
                                !(mas_temp[1][0] == x + 1 && mas_temp[1][1] == y + 1)
                                )
                        {
                            mas_temp[3][0] = x + 1;
                            mas_temp[3][1] = y + 1;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 1, 0))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x && mas_temp[0][1] == y + 1) &&
                                !(mas_temp[1][0] == x && mas_temp[1][1] == y + 1)
                                )
                        {
                            mas_temp[3][0] = x;
                            mas_temp[3][1] = y + 1;
                        }
                    }
                    if (ProvOdinakov(M, y, x, 0, -1))
                    {
                        kolvo++;
                        if (
                                !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y) &&
                                !(mas_temp[1][0] == x - 1 && mas_temp[1][1] == y)
                                )
                        {
                            mas_temp[3][0] = x - 1;
                            mas_temp[3][1] = y;
                        }
                    }

                    if (kolvo == 0 || kolvo > 2)
                        return false; //  не четверка, вокруг больше или меньше элементов 

                    //ПРОВЕРЯЕМ второй элемент на соединение с 4м
                    if (mas_temp[3][0] == -1) // четвертый элемент не заполнен, находим его и заполняем
                    {
                        //берем второй элемент тройки и проверяем что вокруг
                        kolvo = 0; //количество элементов вокруг выбраной клетки

                        //!!!!!!!!!!! меняется передаваемые параметры!!!
                        x = mas_temp[1][0]; // заносим в Х и У кординаты второго элемента
                        y = mas_temp[1][1];
                        // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                        if (ProvOdinakov(M, y, x, -1, -1))
                        {
                            kolvo++;
                            if (//если координаты не совпадают с первым элементом и вторым
                                    !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1) &&
                                    !(mas_temp[2][0] == x - 1 && mas_temp[2][1] == y - 1)
                                    )
                            {
                                mas_temp[3][0] = x - 1;
                                mas_temp[3][1] = y - 1;
                            } //заносим их в четвертый слот
                        }
                        if (ProvOdinakov(M, y, x, -1, 0))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x && mas_temp[0][1] == y - 1) &&
                                    !(mas_temp[2][0] == x && mas_temp[2][1] == y - 1)
                                    )
                            {
                                mas_temp[3][0] = x;
                                mas_temp[3][1] = y - 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, 1))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y) &&
                                    !(mas_temp[2][0] == x + 1 && mas_temp[2][1] == y)
                                    )
                            {
                                mas_temp[3][0] = x + 1;
                                mas_temp[3][1] = y;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 1))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1) &&
                                    !(mas_temp[2][0] == x + 1 && mas_temp[2][1] == y + 1)
                                    )
                            {
                                mas_temp[3][0] = x + 1;
                                mas_temp[3][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 1, 0))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x && mas_temp[0][1] == y + 1) &&
                                    !(mas_temp[2][0] == x && mas_temp[2][1] == y + 1)
                                    )
                            {
                                mas_temp[3][0] = x;
                                mas_temp[3][1] = y + 1;
                            }
                        }
                        if (ProvOdinakov(M, y, x, 0, -1))
                        {
                            kolvo++;
                            if (
                                    !(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y) &&
                                    !(mas_temp[2][0] == x - 1 && mas_temp[2][1] == y)
                                    )
                            {
                                mas_temp[3][0] = x - 1;
                                mas_temp[3][1] = y;
                            }
                        }
                    }
                    //------все координаты четверки найдены, заносим их в временный массив            
                    Add(temp, mas_temp[0][1], mas_temp[0][0], 'w');
                    Add(temp, mas_temp[1][1], mas_temp[1][0], 'w');
                    Add(temp, mas_temp[2][1], mas_temp[2][0], 'w');
                    Add(temp, mas_temp[3][1], mas_temp[3][0], 'w');
                    //------делаем ход
                    var tmpz = temp[tmp_y, tmp_x];
                    temp[iy][ix] = tmpz; //замена побитой фишки или становление ее на пустое место
                    temp[tmp_y, tmp_x] = '.'; //на место походившей устанавливаем пустое поле

                    if (OnlyTroyka(temp, iy, ix))
                        return false; //проверка стала ли после хода четверка тройкой
                    else {
                        return true;
                    }//самовостановление    
                }
            }
        }
//-----------------Проверка клетки на наличие соперника --------------------------------------------
        function Vrag(M, y, x, iy, ix)
        {
            if (!VMassive(M, iy, ix))
                return false; //проверка выхода за границы
            if (M[y][x] == 'w' || M[y][x] == 'q')   //если белые фигуры, то, соперника фигуры будут такими:
            {
                if (M[iy][ix] == 'b' || M[iy][ix] == 'z' || M[y][x] == 'c' || M[y][x] == 'C')
                    return true;
            }
            if (M[y][x] == 'b' || M[y][x] == 'z')
            {
                if (M[iy][ix] == 'w' || M[iy][ix] == 'q' || M[y][x] == 'a' || M[y][x] == 'A')
                    return true;
            }
            return false; // напротив находится фигура не соперника
        }
//-----------------Выделение соперника под боем--------------------------------------------
        function VudelenieFiguruBoy(M, y, x)
        {
            if (M[y][x] == 'w')
                M[y][x] = 'a';
            if (M[y][x] == 'q')
                M[y][x] = 'A';
            if (M[y][x] == 'b')
                M[y][x] = 'c';
            if (M[y][x] == 'z')
                M[y][x] = 'C';
        }
//----------------!!!!!!-ВСОМОГАТЕЛЬНАЯ ФУНКЦИЯ ТРОЙКИ ПОДСЧЕТА КОЛ-ВО ОКРУЖАЮЩИХ ЭЛЕМЕНТОВ---------------
        function KolvoElem(M, y, x, many)
        {
            var kolvo = 0;
            if (ProvOdinakov(M, y, x, -1, -1))
                kolvo++;
            if (ProvOdinakov(M, y, x, -1, 0))
                kolvo++;
            if (ProvOdinakov(M, y, x, 0, 1))
                kolvo++;
            if (ProvOdinakov(M, y, x, 1, 1))
                kolvo++;
            if (ProvOdinakov(M, y, x, 1, 0))
                kolvo++;
            if (ProvOdinakov(M, y, x, 0, -1))
                kolvo++;
            if (many == true) {
                return kolvo;
            }
            if (kolvo > 2)
                kolvo = 10; // проверка на кучу, если куча, то вводится недопустимое число            
            return kolvo;
        }
//-------------ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ПРОВЕРКИ БОЯ ГЕНЕРАЛА 1-2 ФИГУР ---------------
        function KolvoElemGeneral(M, y, x)
        {
            var kolvo = 0; //количество элементов вокруг выбраной клетки

            //массив элементов частей тройки, размер 6(максимально возможное колво) на 2(координаты) 
            var mas_temp = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
            mas_temp[kolvo][0] = x;
            mas_temp[kolvo][1] = y; //сохранение координат первого элемента
            // сохраняем координаты остальных элементов, которые окружают его

            if (ProvOdinakov(M, y, x, -1, -1)) {
                kolvo++;
                mas_temp[kolvo][0] = x - 1;
                mas_temp[kolvo][1] = y - 1;
            }
            if (ProvOdinakov(M, y, x, -1, 0)) {
                kolvo++;
                mas_temp[kolvo][0] = x;
                mas_temp[kolvo][1] = y - 1;
            }
            if (ProvOdinakov(M, y, x, 0, 1)) {
                kolvo++;
                mas_temp[kolvo][0] = x + 1;
                mas_temp[kolvo][1] = y;
            }
            if (ProvOdinakov(M, y, x, 1, 1)) {
                kolvo++;
                mas_temp[kolvo][0] = x + 1;
                mas_temp[kolvo][1] = y + 1;
            }
            if (ProvOdinakov(M, y, x, 1, 0)) {
                kolvo++;
                mas_temp[kolvo][0] = x;
                mas_temp[kolvo][1] = y + 1;
            }
            if (ProvOdinakov(M, y, x, 0, -1)) {
                kolvo++;
                mas_temp[kolvo][0] = x - 1;
                mas_temp[kolvo][1] = y;
            }
            if (kolvo > 2)
                return false; //  кличество фишек рядом не подходит
            if (mas_temp[2][0] != -1)
                return false; // больше двух фишек            
            // проводим проверку элемента на большее колво чем 2 фишки рядом
            var proverka_na_mnozhestvo = 0;
            proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[0][1], mas_temp[0][0]);
            proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[1][1], mas_temp[1][0]);
            if (proverka_na_mnozhestvo > 2)
                return false;
            else
                return true;
        }

//-----------------РАСЧЕТ ВОЗМОЖНЫХ ХОДОВ --------------------------------
        function RaschetHoda(M, y, x)
        {
            Thrid(M, y, x); // ЧЕРЕЗ ТРИ КЛЕТКИ + КЛЮШКОЙ 
            Four(M, y, x); // ПО ДИАГОНАЛЯМ + КОСОЙ + УГЛОМ
            Fifth(M, y, x); // ПО ГОРИЗОНТАЛЯМ + УГЛОМ
            General(M, y, x); // ХОД ГЕНЕРАЛОМ + БОЙ ГЕНЕРАЛОМ
        }
        function Click(M, y, x)
        {
            Statistica(M);
            y = Number(y);
            x = Number(x);
            if (// если нажато на не активную фигуру выполняет выделение и расчет хода
                    (M[0][9] == '0' && (M[y][x] == 'w' || M[y][x] == 'q')) || //если ход белых
                    (M[0][9] == '1' && (M[y][x] == 'b' || M[y][x] == 'z'))  //если ход черных  
                    )
            {
                M[0][7] = x; //запись координат активной фигуры Х
                M[0][8] = y; //запись координат активной фигуры У
                NormalMass(M); // функция нормализации массива
                if (Troyka(M, y, x))
                    MovTroyka(M, y, x);
                RaschetHoda(M, y, x);
                VudelenieFiguru(M, y, x); // функция выделения фигуры ДОЛЖНА ВЫПОЛНЯТЬСЯ ПОСЛЕДНЕЙ !!!
            }
            else
            {
                if (M[y][x] == 'x' || M[y][x] == 'a' || M[y][x] == 'A' || M[y][x] == 'c' || M[y][x] == 'C') //нажатие на возможное место для хода
                {
                    //--------счетчик на победу в пять очков
                    if (M[y][x] != 'x' && M[0][9] == '0') //бой белых + проверка боя (не обычного хода)
                    {
                        if (M[1][9] == '0') //черные не лидируют
                        {
                            M[1][8] = Number(M[1][8]) + 1; //добавляем 1 к лидерству белых
                        }
                        else  //черные лидируют
                        {
                            var raznica_fishek = Number(M[1][9]); //отнимаем 1 от лидерства черных
                            raznica_fishek--;
                            M[1][9] = Number(raznica_fishek);
                        }
                    }
                    else
                    {
                        if (M[y][x] != 'x' && M[0][9] == '1') //бой черных  + проверка боя (не обычного хода)
                        {
                            if (M[1][8] == '0') //белые не лидируют
                            {
                                M[1][9] = Number(M[1][9]) + 1; //добавляем 1 к лидерству черных
                            }
                            else  //белые лидируют
                            {
                                raznica_fishek = Number(M[1][8]); //отнимаем 1 от лидерства белых
                                raznica_fishek--;
                                M[1][8] = Number(raznica_fishek);
                            }
                        }
                    }
                    //-----------------------------------------------

                    var tmp = M[Number(M[0][8])][Number(M[0][7])];
                    if (M[y][x] == 'A')
                        M[2][9] = '1'; //убит белый генерал
                    if (M[y][x] == 'C')
                        M[2][9] = '0'; //убит черный генерал
                    M[y][x] = tmp; //замена побитой фишки или становление ее на пустое место
                    M[Number(M[0][8])][Number(M[0][7])] = '.'; //на место походившей устанавливаем пустое поле                    
                    if (M[0][9] == '1')
                        M[0][9] = '0'; //смена флага хода на противоположный
                    else
                        M[0][9] = '1';
                    M[0][7] = 'n'; //обнуление координат активной фигуры Х, У
                    M[0][8] = 'n';
                    NormalMass(M);
                }
            }

            //------------ПРОВЕРКА ПОБЕДЫ--------------------------
            if (M[1][3] == 'q')
            {
                if (M[0][3] == 'w')
                    if (M[0][2] == 'w')
                        return "Захват поля, победа белых (2,5 очка)";
                ;
            }
            else if (M[7][6] == 'z')
            {
                if (M[8][6] == 'b')
                    if (M[8][7] == 'b')
                        return "Захват поля, победа черных (2,5 очка)";
                ;
            }

            if (M[1][8] == '5')
                return "Преимущество в пять фигур, победа белых (2 очка)";
            if (M[1][9] == '5')
                return "Преимущество в пять фигур, победа черных (2 очка)";
            if (M[2][9] == '1')
                return "Убит белый генерал, победа черных (1 очко)";
            if (M[2][9] == '0')
                return "Убит Черный генерал, победа белых (1 очко)";
            return "0";
        }
//-----------------ПОИСК ТРОЙКИ/четверки --------------------------------
        function OnlyTroyka(M, y, x)
        {
            var temp_y = y, temp_x = x;
            var kolvo = 0; //количество элементов вокруг выбраной клетки

            //массив элементов частей тройки, размер 6(максимально возможное колво) на 2(координаты) 
            var mas_temp = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
            mas_temp[kolvo][0] = x;
            mas_temp[kolvo][1] = y; //сохранение координат первого элемента
            // сохраняем координаты остальных элементов, которые окружают его

            if (ProvOdinakov(M, y, x, -1, -1)) {
                kolvo++;
                mas_temp[kolvo][0] = x - 1;
                mas_temp[kolvo][1] = y - 1;
            }
            if (ProvOdinakov(M, y, x, -1, 0)) {
                kolvo++;
                mas_temp[kolvo][0] = x;
                mas_temp[kolvo][1] = y - 1;
            }
            if (ProvOdinakov(M, y, x, 0, 1)) {
                kolvo++;
                mas_temp[kolvo][0] = x + 1;
                mas_temp[kolvo][1] = y;
            }
            if (ProvOdinakov(M, y, x, 1, 1)) {
                kolvo++;
                mas_temp[kolvo][0] = x + 1;
                mas_temp[kolvo][1] = y + 1;
            }
            if (ProvOdinakov(M, y, x, 1, 0)) {
                kolvo++;
                mas_temp[kolvo][0] = x;
                mas_temp[kolvo][1] = y + 1;
            }
            if (ProvOdinakov(M, y, x, 0, -1)) {
                kolvo++;
                mas_temp[kolvo][0] = x - 1;
                mas_temp[kolvo][1] = y;
            }

            if (kolvo == 0 || kolvo > 2)
                return false; // не тройка, кличество фишек рядом не подходит
            if (mas_temp[2][0] == -1) // третий элемент не заполнен, находим его и заполняем
            {
                //берем второй элемент тройки и проверяем что вокруг
                kolvo = 0; //количество элементов вокруг выбраной клетки

                //!!!!!!!!!!! меняется передаваемые параметры!!!
                x = mas_temp[1][0]; // заносим в Х и У кординаты второго элемента
                y = mas_temp[1][1];
                // сохраняем координаты остальных элементов, которые окружают его, проверяя не одинаковый элемент с первой ячейкой
                if (ProvOdinakov(M, y, x, -1, -1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y - 1)) //если координаты не совпадают с первым элементом
                    {
                        mas_temp[2][0] = x - 1;
                        mas_temp[2][1] = y - 1;
                    }
                }
                if (ProvOdinakov(M, y, x, -1, 0))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x && mas_temp[0][1] == y - 1))
                    {
                        mas_temp[2][0] = x;
                        mas_temp[2][1] = y - 1;
                    }
                }
                if (ProvOdinakov(M, y, x, 0, 1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y))
                    {
                        mas_temp[2][0] = x + 1;
                        mas_temp[2][1] = y;
                    }
                }
                if (ProvOdinakov(M, y, x, 1, 1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x + 1 && mas_temp[0][1] == y + 1))
                    {
                        mas_temp[2][0] = x + 1;
                        mas_temp[2][1] = y + 1;
                    }
                }
                if (ProvOdinakov(M, y, x, 1, 0))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x && mas_temp[0][1] == y + 1))
                    {
                        mas_temp[2][0] = x;
                        mas_temp[2][1] = y + 1;
                    }
                }
                if (ProvOdinakov(M, y, x, 0, -1))
                {
                    kolvo++;
                    if (!(mas_temp[0][0] == x - 1 && mas_temp[0][1] == y))
                    {
                        mas_temp[2][0] = x - 1;
                        mas_temp[2][1] = y;
                    }
                }

                if (kolvo == 0 || kolvo > 2)
                    return false; //  не тройка, вокруг больше или меньше элементов                               
            }
            //-------------------ТРОЙКА ?
            if (mas_temp[2][0] != -1)
            {
                // проводим проверку остальных частей тройки что бы не было множества
                var proverka_na_mnozhestvo = 0;
                proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[0][1], mas_temp[0][0]);
                proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[1][1], mas_temp[1][0]);
                proverka_na_mnozhestvo = proverka_na_mnozhestvo + KolvoElem(M, mas_temp[2][1], mas_temp[2][0]);
                if (proverka_na_mnozhestvo != 4) {
                    return false;
                }
                else {
                    return true;
                }

            }
            return false;
        }

        function Statistica(Z) {
            var WHITE = {white: 0, troyka: 0, quadro: 0, zero: 0, one: 0, two: 0, three: 0, kolvoboy: 0};
            var BLACK = {white: 0, troyka: 0, quadro: 0, zero: 0, one: 0, two: 0, three: 0, kolvoboy: 0};
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 10; j++) {
                    if (Z[i][j] === '.')
                        continue;
                    if (Z[i][j] === 'w' || Z[i][j] === 'W' || Z[i][j] === 'q' || Z[i][j] === 'Q' || Z[i][j] === 'a' || Z[i][j] === 'A') {
                        WHITE.white++;
                        if (Troyka(Z, i, j)) {
                            if (OnlyTroyka(Z, i, j)) {
                                WHITE.troyka++;
                            } else {
                                WHITE.quadro++;
                            }
                            WHITE.kolvoboy = WHITE.kolvoboy + KolvoPodBoem(Z, i, j);
                        } else {
                            switch (KolvoElem(Z, i, j, true)) {
                                case 0:
                                    WHITE.zero++;
                                    break;
                                case 1:
                                    WHITE.one++;
                                    break;
                                case 2:
                                    WHITE.two++;
                                    break;
                                case 3:
                                    WHITE.three++;
                                    break;
                            }

                        }
                    }
                    if (Z[i][j] === 'b' || Z[i][j] === 'B' || Z[i][j] === 'z' || Z[i][j] === 'Z' || Z[i][j] === 'c' || Z[i][j] === 'C') {
                        BLACK.white++;
                        if (Troyka(Z, i, j)) {
                            if (OnlyTroyka(Z, i, j)) {
                                BLACK.troyka++;
                            } else {
                                BLACK.quadro++;
                            }
                             BLACK.kolvoboy = BLACK.kolvoboy + KolvoPodBoem(Z, i, j);
                        } else {
                            switch (KolvoElem(Z, i, j, true)) {
                                case 0:
                                    BLACK.zero++;
                                    break;
                                case 1:
                                    BLACK.one++;
                                    break;
                                case 2:
                                    BLACK.two++;
                                    break;
                                case 3:
                                    BLACK.three++;
                                    break;
                            }

                        }
                    }
                }
            }
            Z[8][0] = WHITE;
            Z[8][1] = BLACK;
//            console.log(WHITE);
//            console.log(BLACK);
            return;
        }
        /*-----Количество фигур под боем выбранной пешки-----*/
        function KolvoPodBoem(Z, y, x) {
            var kolvo = 0;
            var M = [
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
            ];
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 10; j++) {
                    M[i][j]=Z[i][j];                    
                }
            }
            if(M[0][9]==1){
                M[0][9]=0;
            }else{
                M[0][9]=1;
            }
            MovTroyka(M, y, x);
            for (var i = 0; i < 9; i++) {
                for (var j = 0; j < 10; j++) {
                    if(M[i][j]=='a' || M[i][j]=='A' || M[i][j]=='c' || M[i][j]=='C'){
                        kolvo++;
                    }                  
                }
            }
            return kolvo;
        }
