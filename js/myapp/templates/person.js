
    <form class="form-horizontal">
        <div class="control-group">
            <label class="control-label" for="p_surename">Name</label>
            <div class="controls">
                <input type="text" id="p_surename" modelAttr="surename" data-error-style="inline"/> <%= surename %>
                <span class="help-inline"></span>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="p_firstname">Vorname</label>
            <div class="controls">
        <input type="text" id="p_firstname" modelAttr="firstname" data-error-style="inline"/>
                <span class="help-inline"></span>

            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="p_birthday">Geburtsdatum</label>
            <div class="controls">
        <input type="text" id="p_birthday" modelAttr="birthday" data-error-style="inline"/>
                <span class="help-inline"></span>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="p_creditcardnumber">Kreditkartennummer</label>
            <div class="controls">
        <input type="text" id="p_creditcardnumber" modelAttr="creditcardnumber" data-error-style="inline"/>
                <span class="help-inline"></span>
            </div>
        </div>

        <input type="button" id="next" value="Weiter"/>
    </form>