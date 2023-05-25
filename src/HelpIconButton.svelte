<script>

    export let iconName = '';
    export let iconText = null;
    export let selected = false;
    export let spin = false;
    export let tabindex = 0;
    export { className as class };
    export let color = '--figma-color-icon';

    let className = '';

</script>

<div on:click onclick="this.blur();" class:selected={selected} class="{className}" tabindex={tabindex}  style="color: var({color}); fill: var({color})">
    <svg viewBox="0 0 208 208" xmlns="http://www.w3.org/2000/svg" style="color: var({color}); fill: var({color})">
        <path style="color: var({color}); fill: var({color})" d="M104 0C83.4308 0 63.3235 6.09949 46.2207 17.5272C29.118 28.9548 15.7881 45.1974 7.91658 64.2009C0.0450616 83.2044 -2.01449 104.115 1.99838 124.289C6.01124 144.463 15.9163 162.994 30.4609 177.539C45.0056 192.084 63.5366 201.989 83.7107 206.002C103.885 210.015 124.796 207.955 143.799 200.083C162.803 192.212 179.045 178.882 190.473 161.779C201.901 144.677 208 124.569 208 104C207.971 76.4264 197.004 49.9905 177.507 30.4931C158.01 10.9956 131.574 0.0291182 104 0ZM104 168C101.627 168 99.3066 167.296 97.3332 165.978C95.3598 164.659 93.8217 162.785 92.9135 160.592C92.0052 158.399 91.7676 155.987 92.2306 153.659C92.6936 151.331 93.8365 149.193 95.5148 147.515C97.193 145.836 99.3312 144.694 101.659 144.231C103.987 143.768 106.4 144.005 108.592 144.913C110.785 145.822 112.659 147.36 113.978 149.333C115.296 151.307 116 153.627 116 156C116 159.183 114.736 162.235 112.485 164.485C110.235 166.736 107.183 168 104 168ZM112 119.28V120C112 122.122 111.157 124.157 109.657 125.657C108.157 127.157 106.122 128 104 128C101.878 128 99.8435 127.157 98.3432 125.657C96.8429 124.157 96 122.122 96 120V112C96 109.878 96.8429 107.843 98.3432 106.343C99.8435 104.843 101.878 104 104 104C117.23 104 128 95 128 84C128 73 117.23 64 104 64C90.77 64 80 73 80 84V88C80 90.1217 79.1572 92.1566 77.6569 93.6569C76.1566 95.1571 74.1218 96 72 96C69.8783 96 67.8435 95.1571 66.3432 93.6569C64.8429 92.1566 64 90.1217 64 88V84C64 64.15 81.94 48 104 48C126.06 48 144 64.15 144 84C144 101.38 130.24 115.93 112 119.28Z" fill="black"/>
        </svg>
</div>
<style>

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: var(--size-small);
        height: var(--size-small);
        border-radius: var(--border-radius-small);
        border: 2px solid transparent;
    }
    div:hover *{
        opacity: 0.75;
    }
    div:active, div:focus {
        border: 2px solid var(--figma-color-border-brand-strong);
        outline: none;
    }

    .selected {
        background-color: var(--figma-color-bg-selected-strong);
    }
    .selected:hover {
        background-color: var(--figma-color-bg-selected-strong);
    }
    .selected:active, .selected:focus {
        border: 2px solid var(--figma-color-border-selected-strong);
    }

</style>