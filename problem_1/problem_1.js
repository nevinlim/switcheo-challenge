/*
Proovide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

var sum_to_n_a = function(n) { // iterative approach
    let res = 0;
    for (let i = 1; i<=n; i++) {
        res+=i;
    }
    return res;
};

var sum_to_n_b = function(n) { // recursive approach
    if (n ==1) {
        return n;
    }
    return n + sum_to_n_b(n-1);
};

var sum_to_n_c = function(n) { // formula approach
    return (n/2) * (n+1);
};
