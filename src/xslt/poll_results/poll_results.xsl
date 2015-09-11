<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- Force the output to be strict XHTML -->
  <xsl:output method="html"></xsl:output>
  <xsl:param name="class_id"></xsl:param>
  <xsl:param name="image_server_url">http://img.preview.webmd.com/dtmcms/preview</xsl:param>
  <xsl:param name="moduletitle"></xsl:param>
  <xsl:param name="site_id">3</xsl:param>
  <xsl:param name="domain">devint.webmdtest.net</xsl:param>
  <xsl:template match="/">
    <xsl:apply-templates select="webmd_rendition/content/wbmd_asset/content_section/poll"></xsl:apply-templates>
  </xsl:template>
  <xsl:template match="poll">
    <xsl:element name="div">
      <xsl:attribute name="class">
        <xsl:text>pollResults_rdr</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="id">
        <xsl:value-of select="$moduletitle"></xsl:value-of>
      </xsl:attribute>
      
      <xsl:element name="div">
        <xsl:attribute name="class">
          <xsl:text>resultsHeader_fmt</xsl:text>
        </xsl:attribute>
        
        <xsl:element name="h2">
          <xsl:value-of select="questions/question/questiontext1"></xsl:value-of>
        </xsl:element>
      </xsl:element>
      
      <xsl:element name="h3">
        <xsl:text>Poll Results</xsl:text>
      </xsl:element>
      
      <xsl:element name="div">
        <xsl:attribute name="class">
          <xsl:text>content_fmt</xsl:text>
        </xsl:attribute>
        
        <xsl:element name="div">
          <xsl:attribute name="class">
            <xsl:text>pollBody_fmt</xsl:text>
          </xsl:attribute>
          
          <xsl:element name="div">
            <xsl:attribute name="class">
              <xsl:text>resultLines_fmt</xsl:text>
            </xsl:attribute>
            <xsl:apply-templates select="questions/question/choices/choice"></xsl:apply-templates>
          </xsl:element>
        </xsl:element>
      </xsl:element>
    </xsl:element>
    
    <xsl:element name="div">
      <xsl:attribute name="class">
        <xsl:text>disclaimer_fmt</xsl:text>
      </xsl:attribute>
      <xsl:copy-of select="//wbmd_disclaimer/disclaimer_statement/node()"></xsl:copy-of>
    </xsl:element>
    
    <xsl:element name="div">
      <xsl:attribute name="class">
        <xsl:text>moduleSpacer_rdr</xsl:text>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>
  
  <xsl:template match="choice">
    <xsl:element name="div">
      <xsl:attribute name="class">
        <xsl:text>resultLine</xsl:text>
      </xsl:attribute>
      
      <xsl:element name="div">
        <xsl:attribute name="class">
          <xsl:text>percent</xsl:text>
        </xsl:attribute>
        <xsl:value-of select="votepercentage"></xsl:value-of>
        
        <xsl:element name="span">
          <xsl:attribute name="class">
            <xsl:text>symbol</xsl:text>
          </xsl:attribute>
          <xsl:text>%</xsl:text>
        </xsl:element>
      </xsl:element>
      
      <xsl:element name="div">
        <xsl:attribute name="class">
          <xsl:text>graphContainer</xsl:text>
        </xsl:attribute>
        
        <xsl:element name="h4">
          <xsl:value-of select="choicetext1"></xsl:value-of>
        </xsl:element>
        
        <xsl:element name="div">
          <xsl:attribute name="class">
            <xsl:text>filler_wrapper_fmt</xsl:text>
          </xsl:attribute>
          
          <xsl:element name="div">
            <xsl:attribute name="class">
              <xsl:text>filler_fmt</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="style">
              <xsl:text>width:</xsl:text>
              <xsl:value-of select="round(4 * votepercentage)"></xsl:value-of>
              <xsl:text>px</xsl:text>
            </xsl:attribute>
          </xsl:element>
        </xsl:element>
      </xsl:element>
    </xsl:element>
  </xsl:template>
  
  <xsl:template name="GetLinkType">
    <xsl:param name="Value"></xsl:param>
    <xsl:choose>
      <xsl:when test="$Value = 'Window'">nw</xsl:when>
      <xsl:when test="$Value = 'Pop Up'">sp</xsl:when>
      <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <xsl:template name="GetURLRef">
    <xsl:param name="ObjectID"></xsl:param>
    <xsl:if test="(//referenced_objects/object[@chronic_id=$ObjectID and @pointer='0']/target[@siteid=$site_id]/@friendlyurl) or (//referenced_objects/object[@chronic_id=$ObjectID and @pointer='1']/target/@friendlyurl)">
      <xsl:choose>
        <xsl:when test="//referenced_objects/object[@chronic_id=$ObjectID]//@pointer = '1'">
          <xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target/@friendlyurl"></xsl:value-of>
        </xsl:when>
        <xsl:otherwise>http://<xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@prefix[1]"></xsl:value-of>.<xsl:value-of select="$domain"></xsl:value-of>
          <xsl:value-of select="//referenced_objects/object[@chronic_id=$ObjectID][1]/target[@siteid=$site_id]/@friendlyurl[1]"></xsl:value-of>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>
  
</xsl:stylesheet>
